import { ServerResponse } from 'http';
import { LoggerModule, LoggerModuleAsyncParams, Params } from 'nestjs-pino';
import { Options } from 'pino-http';
import { NestServerLogger, ServerLogger } from './server-logger';
import { ServerLoggerModule } from './server-logger.module';

jest.mock('nestjs-pino', () => ({
  ...(jest.requireActual('nestjs-pino') as any),
  LoggerModule: class LoggerModuleMock {
    static forRoot = jest.fn();

    static forRootAsync = jest.fn();
  },
}));

const loggerModuleResult = { providers: [] };

describe('ServerLoggerModule', () => {
  beforeEach(() => {
    (<jest.Mock>LoggerModule.forRoot).mockReturnValue(loggerModuleResult);
    (<jest.Mock>LoggerModule.forRootAsync).mockReturnValue(loggerModuleResult);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('forRoot', () => {
    it('should provide ServerLogger and NestServerLogger', () => {
      const result = ServerLoggerModule.forRoot();

      expect(result).toMatchObject({
        providers: [ServerLogger, NestServerLogger],
      });
    });

    it('should invoke LoggerModule "forRoot" with overridden "customLogLevel" and excluding "/health" endpoint', () => {
      const customLogLevel = jest.fn();
      const params = {
        pinoHttp: {
          level: 'debug',
          customLogLevel,
        },
      };

      ServerLoggerModule.forRoot(params);

      expect(LoggerModule.forRoot).toHaveBeenCalledWith({
        ...params,
        pinoHttp: {
          ...params.pinoHttp,
          customLogLevel: expect.any(Function),
        },
        exclude: ['/health'],
      });
    });

    it.each([
      ['warn', 400],
      ['warn', 499],
      ['error', 500],
      ['info', 200],
      ['info', 399],
    ])(
      'should set the logger level to "%s" when statusCode is %s',
      (expected, statusCode) => {
        ServerLoggerModule.forRoot();

        const params = <Params>(
          (<jest.Mock>LoggerModule.forRoot).mock.calls[0][0]
        );
        const { customLogLevel } = <Options>params.pinoHttp;

        const res = {
          statusCode,
        } as ServerResponse;

        const actual = customLogLevel!(res, new Error());
        expect(actual).toEqual(expected);
      },
    );
  });

  describe('forRootAsync', () => {
    it('should provide ServerLogger and NestServerLogger', () => {
      const result = ServerLoggerModule.forRootAsync({
        useFactory: () => Promise.resolve({}),
      });

      expect(result).toMatchObject({
        providers: [ServerLogger, NestServerLogger],
      });
    });

    it('should invoke LoggerModule "forRootAsync" with overridden "customLogLevel" and excluding "/health" endpoint', async () => {
      const customLogLevel = jest.fn();
      const params = {
        pinoHttp: {
          level: 'debug',
          customLogLevel,
        },
      };

      ServerLoggerModule.forRootAsync({
        useFactory: () => Promise.resolve(params),
      });

      expect(LoggerModule.forRootAsync).toHaveBeenCalled();

      const { useFactory } = <LoggerModuleAsyncParams>(
        (<jest.Mock>LoggerModule.forRootAsync).mock.calls[0][0]
      );
      const actual = await useFactory();

      expect(actual).toEqual({
        ...params,
        pinoHttp: {
          ...params.pinoHttp,
          customLogLevel: expect.any(Function),
        },
        exclude: ['/health'],
      });
    });
  });
});

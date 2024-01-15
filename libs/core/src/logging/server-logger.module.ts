import { DynamicModule } from '@nestjs/common';
import { LoggerModule, LoggerModuleAsyncParams, Params } from 'nestjs-pino';
import { ServerResponse } from 'http';
import { NestServerLogger, ServerLogger } from './server-logger';

export class ServerLoggerModule extends LoggerModule {
  private static normalizeParams(params: Params = {}): Params {
    return {
      ...params,
      pinoHttp: {
        ...(params.pinoHttp ?? {}),
        customLogLevel: (_, res: ServerResponse) => {
          if (res.statusCode >= 400 && res.statusCode <= 499) {
            return 'warn';
          }

          if (res.statusCode >= 500) {
            return 'error';
          }

          return 'info';
        },
      },
      exclude: ['/health'],
    };
  }

  public static forRoot(params: Params = {}): DynamicModule {
    const result = LoggerModule.forRoot(
      ServerLoggerModule.normalizeParams(params),
    );
    return {
      ...result,
      providers: [...(result.providers ?? []), ServerLogger, NestServerLogger],
    };
  }

  public static forRootAsync(params: LoggerModuleAsyncParams): DynamicModule {
    const result = LoggerModule.forRootAsync({
      ...params,
      useFactory: async (...args: any[]) => {
        const plainParams = await params.useFactory(...args);
        return ServerLoggerModule.normalizeParams(plainParams);
      },
    });

    return {
      ...result,
      providers: [...(result.providers ?? []), ServerLogger, NestServerLogger],
    };
  }
}

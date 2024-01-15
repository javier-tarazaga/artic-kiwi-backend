import { Options } from 'pino-http';

export const loggerOptions: Options = {
  level: process.env.LOG_LEVEL ?? 'debug',
  autoLogging: false, // Lets disable this for now otherwise adds a lot of cluter to the logs
};

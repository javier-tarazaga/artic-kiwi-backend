/* eslint-disable max-classes-per-file */
import { InjectPinoLogger, Logger, PinoLogger } from 'nestjs-pino';

export const InjectServerLogger = InjectPinoLogger;

export class ServerLogger extends PinoLogger {}

export class NestServerLogger extends Logger {}

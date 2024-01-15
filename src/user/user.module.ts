import { Module } from '@nestjs/common';
import * as Services from './services';
import * as Mappers from './mappers';
import * as Repositories from './repositories';
import { DatabaseModule } from 'src/database/database.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ServerLoggerModule } from '@app/core';
import { loggerOptions } from 'src/config/logger.config';

@Module({
  imports: [
    DatabaseModule,
    CqrsModule,
    ServerLoggerModule.forRoot({
      pinoHttp: loggerOptions,
    }),
  ],
  providers: [
    ...Object.values(Services),
    ...Object.values(Mappers),
    ...Object.values(Repositories),
  ],
  exports: [...Object.values(Services)],
})
export class UserModule {}

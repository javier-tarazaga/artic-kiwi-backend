import { Module } from '@nestjs/common';
import * as Services from './services';
import * as Mappers from './mappers';
import * as Repositories from './repositories';
import { CqrsModule } from '@nestjs/cqrs';
import { ServerLoggerModule } from '@artic-kiwi/backend-core';
import { loggerOptions } from '../common';
import { DatabaseModule } from '../database';

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
export class ListModule {}

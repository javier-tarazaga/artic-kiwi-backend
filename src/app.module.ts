import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';
import { GatewayModule } from './gateway/gateway.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ServerLoggerModule } from '@app/core';
import { loggerOptions } from './config/logger.config';

@Module({
  imports: [
    GatewayModule,
    AuthModule,
    ListModule,
    TaskModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
    ServerLoggerModule.forRoot({
      pinoHttp: loggerOptions,
    }),
  ],
})
export class AppModule {}

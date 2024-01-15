import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ServerLoggerModule } from '@app/core';
import { SocketModule } from './sockets/socket.module';
import { WSUserModule } from './user/ws.user.module';
import { loggerOptions } from 'src/config/logger.config';

@Module({
  imports: [
    UserModule,
    ServerLoggerModule.forRoot({
      pinoHttp: loggerOptions,
    }),
    SocketModule,
    WSUserModule,
  ],
})
export class WsModule {}

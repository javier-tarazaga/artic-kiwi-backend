import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ServerLoggerModule } from '@app/core';
import { loggerOptions } from 'src/common/logger.config';
import { SocketModule } from './sockets/socket.module';
import { WSUserModule } from './user/ws.user.module';

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

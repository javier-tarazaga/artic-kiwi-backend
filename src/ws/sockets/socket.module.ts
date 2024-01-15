import { Module } from '@nestjs/common';
import { SocketBaseGateway } from './socket-base.gateway';
import { SocketService } from './socket.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [SocketBaseGateway, SocketService],
  exports: [SocketService],
})
export class SocketModule {}

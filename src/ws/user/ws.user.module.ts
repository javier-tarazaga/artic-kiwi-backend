import { Module } from '@nestjs/common';
import * as Services from './services';
import { SocketModule } from '../sockets/socket.module';

@Module({
  imports: [SocketModule],
  providers: [...Object.values(Services)],
  exports: Object.values(Services),
})
export class WSUserModule {}

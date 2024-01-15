import { Module } from '@nestjs/common';
import * as Services from './services';
import * as Sagas from './sagas';
import { SocketModule } from '../sockets/socket.module';

@Module({
  imports: [SocketModule],
  providers: [...Object.values(Services), ...Object.values(Sagas)],
  exports: Object.values(Services),
})
export class WSUserModule {}

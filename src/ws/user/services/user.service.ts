import { Injectable } from '@nestjs/common';
import { SocketService } from 'src/ws/sockets/socket.service';

@Injectable()
export class UserService {
  constructor(private readonly wsService: SocketService) {}

  // public async handleTaskCompleted() {}
}

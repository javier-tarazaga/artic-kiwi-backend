import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { InjectServerLogger, ServerLogger } from '@app/core';
import { ServerException } from '@app/server-errors';
import { MessageType } from '../message-type';
import { wsConfig } from '../config/ws.config';
import { getUserRoomId } from '../room-ids';
import { UserService } from 'src/user/services';
import { Room } from 'socket.io-adapter';
import { JwtTokenService } from 'src/auth/services';

@WebSocketGateway({
  path: '/ws',
  cors: true,
  allowEIO3: true,
})
export class SocketBaseGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server!: Server;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtTokenService,
    @InjectServerLogger(SocketBaseGateway.name)
    private readonly logger: ServerLogger,
  ) {}

  public async handleConnection(socket: Socket): Promise<Socket> {
    const token = <string | undefined>socket.handshake.auth.token;

    try {
      if (!token) {
        this.logger.warn(
          { req: socket.request, handshake: socket.handshake },
          'Unauthorized connection, dropping it',
        );
        return socket.disconnect();
      }

      const authData = await this.jwtService.verifyToken(token);
      const user = await this.userService.findOne(authData.id);
      const roomId = getUserRoomId(user.id);
      const room = this.getRoom(roomId);

      if (room && room.length >= wsConfig.maxConcurrentUserDevices) {
        this.logger.warn(
          {
            userId: user.id,
            maxConcurrentUserDevices: wsConfig.maxConcurrentUserDevices,
          },
          'User has reached max amount of concurrent devices',
        );
        return socket.disconnect();
      }

      socket
        .use((args, next) => {
          const data = args[1] ?? {};
          data.currentUser = user;
          next();
        })
        .join(roomId);

      socket.emit(MessageType.AUTHENTICATED, {
        socketId: socket.id,
        userId: user.id,
      });

      return socket;
    } catch (err) {
      if (ServerException.isUnauthorized(err)) {
        this.logger.warn(
          { req: socket.request, err },
          'Unauthorized connection, dropping it',
        );
      } else {
        this.logger.error(
          { req: socket.request, err },
          'Error while validating the user.',
        );
      }

      return socket.disconnect();
    }
  }

  public getRoom(roomId: string): Room | undefined {
    return this.server.sockets.adapter.rooms.get(roomId) as unknown as Room;
  }

  public sendMessageToAll(message: MessageType, payload: Record<string, any>) {
    return this.server.emit(message, payload);
  }

  public sendMessageToRoom(
    recipientId: string,
    message: MessageType,
    payload: Record<string, any>,
  ) {
    return this.server.to(recipientId).emit(message, payload);
  }
}

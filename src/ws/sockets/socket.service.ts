import { Injectable } from '@nestjs/common';
import { MessageType } from '../message-type';
import { SocketBaseGateway } from './socket-base.gateway';

@Injectable()
export class SocketService {
  constructor(private readonly wsBaseGateway: SocketBaseGateway) {}

  sendMessageToAll(message: MessageType, payload: Record<string, any>) {
    return this.wsBaseGateway.sendMessageToAll(message, payload);
  }

  sendMessageToRoom(
    recipientId: string,
    message: MessageType,
    payload: Record<string, any>,
  ) {
    return this.wsBaseGateway.sendMessageToRoom(recipientId, message, payload);
  }

  sendMessageToRooms(
    recipientIds: string[],
    message: MessageType,
    payload: Record<string, any>,
  ) {
    return recipientIds.map((id) =>
      this.wsBaseGateway.sendMessageToRoom(id, message, payload),
    );
  }
}

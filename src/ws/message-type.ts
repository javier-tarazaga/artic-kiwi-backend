import { UserDto } from '@app/common';

export interface WsMessagePayload {
  currentUser?: UserDto;
}

export enum MessageType {
  AUTHENTICATED = 'authenticated',

  TASK_COMPLETED = 'task-completed',
}

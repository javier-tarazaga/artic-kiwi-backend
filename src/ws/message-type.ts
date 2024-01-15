import { UserDto } from '@app/common';

export interface WsMessagePayload {
  currentUser?: UserDto;
}

export enum MessageType {
  AUTHENTICATED = 'authenticated',

  CHALLENGE_COMPLETED = 'challenge-completed',
  CHALLENGE_CLAIMED = 'challenge-claimed',
  AVATAR_SIZE_INCREASED = 'avatar-size-increased',
}

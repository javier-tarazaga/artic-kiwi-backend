import {
  UserAvatarSizeIncreasedEvent,
  UserChallengeCompletedEvent,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { SocketService } from 'src/ws/sockets/socket.service';
import { getUserRoomId } from '../../room-ids';
import { MessageType } from '../../message-type';

@Injectable()
export class UserService {
  constructor(private readonly wsService: SocketService) {}

  public async handleUserAvatarSizeIncreased(
    event: UserAvatarSizeIncreasedEvent,
  ) {
    const { user } = event;

    this.wsService.sendMessageToRoom(
      getUserRoomId(user.id),
      MessageType.AVATAR_SIZE_INCREASED,
      { user },
    );
  }

  public async handleUserChallengeCompleted(
    event: UserChallengeCompletedEvent,
  ) {
    const { userId, userChallenge } = event;

    this.wsService.sendMessageToRoom(
      getUserRoomId(userId),
      MessageType.CHALLENGE_COMPLETED,
      { userChallenge },
    );
  }

  public async handleUserChallengeClaimed(event: UserChallengeCompletedEvent) {
    const { userId, userChallenge } = event;

    this.wsService.sendMessageToRoom(
      getUserRoomId(userId),
      MessageType.CHALLENGE_CLAIMED,
      { userChallenge },
    );
  }
}

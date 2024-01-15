import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { UserDeletedEvent, UserDto } from '@app/common';
import { EventBus } from '@nestjs/cqrs';
import { ServerError, ServerException } from '@app/server-errors';
import { AuthService } from 'src/auth/services';
import { UserService } from 'src/user/services';
import { ListService } from 'src/list/services';

@Injectable()
export class UserDeletionService {
  constructor(
    private readonly client: MongoClient,
    private readonly listService: ListService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}

  async deleteUser(userId: string): Promise<UserDto> {
    const user = await this.userService.findOne(userId.toString());
    if (!user) {
      throw new ServerException({
        error: ServerError.User.NotFound,
        message: 'User not found',
      });
    }

    const session = this.client.startSession();
    session.startTransaction();

    try {
      // Perform deletions in the correct order
      await this.userService.deleteUser(user.id, session);
      await this.listService.delteUserLists(user.id, session);
      await this.authService.deleteUserInfo(user.id, session);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error; // Rethrow for further handling or logging
    } finally {
      session.endSession();
    }

    this.eventBus.publish(new UserDeletedEvent(user));

    return user;
  }
}

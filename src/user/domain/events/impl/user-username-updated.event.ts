import { User } from 'src/user/domain';

export class UserUsernameUpdatedEvent {
  constructor(public readonly user: User) {}
}

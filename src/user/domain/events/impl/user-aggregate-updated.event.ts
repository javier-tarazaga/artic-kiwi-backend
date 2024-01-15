import { User } from 'src/user/domain';

export class UserAggregateUpdatedEvent {
  constructor(public readonly user: User) {}
}

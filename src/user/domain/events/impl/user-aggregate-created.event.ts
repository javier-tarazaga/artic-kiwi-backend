import { User } from 'src/user/domain';

export class UserAggregateCreatedEvent {
  constructor(public readonly user: User) {}
}

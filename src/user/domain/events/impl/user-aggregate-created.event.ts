import { User } from '../../user';

export class UserAggregateCreatedEvent {
  constructor(public readonly user: User) {}
}

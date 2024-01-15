import { User } from '../../user';

export class UserAggregateNotificationsTokenChangedEvent {
  constructor(public readonly user: User) {}
}

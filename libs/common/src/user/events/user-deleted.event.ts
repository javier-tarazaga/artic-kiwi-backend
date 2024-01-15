import { UserDto } from '../dtos';

export class UserDeletedEvent {
  constructor(public user: UserDto) {}
}

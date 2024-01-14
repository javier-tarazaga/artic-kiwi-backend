import { UserCredential } from '../../user-credential';

export class UserCredentialAggregateUpdatedEvent {
  public userCredential: UserCredential;

  constructor(userCredential: UserCredential) {
    this.userCredential = userCredential;
  }
}

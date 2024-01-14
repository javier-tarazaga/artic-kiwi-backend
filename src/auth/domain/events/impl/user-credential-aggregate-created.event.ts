import { UserCredential } from '../../user-credential';

export class UserCredentialAggregateCreatedEvent {
  public userCredential: UserCredential;

  constructor(userCredential: UserCredential) {
    this.userCredential = userCredential;
  }
}

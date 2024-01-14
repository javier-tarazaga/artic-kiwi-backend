import { UserCredential } from '../../user-credential';

export class UserCredentialAggregateDeletedEvent {
  public userCredential: UserCredential;

  constructor(userCredential: UserCredential) {
    this.userCredential = userCredential;
  }
}

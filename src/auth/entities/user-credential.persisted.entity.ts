import { ObjectId } from 'mongodb';

export class UserCredentialPersistedEntity {
  _id!: ObjectId;
  userId!: ObjectId;
  providerType!: string;
  providerId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

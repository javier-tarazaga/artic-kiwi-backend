import { ObjectId } from 'mongodb';

export interface UserPersistedEntity {
  _id: ObjectId;
  username: string;
  termsAcceptedAt: Date;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  picture?: string;
}

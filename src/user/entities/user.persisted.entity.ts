import { ObjectId } from 'mongodb';

export interface UserNotificationsTokenEntity {
  deviceToken: string;
  updatedAt: Date;
}

export interface UserPersistedEntity {
  _id: ObjectId;
  username: string;
  termsAcceptedAt: Date;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  notificationsToken?: UserNotificationsTokenEntity;
  lastLoggedInAt?: Date;
  referrerUserId?: ObjectId;
}

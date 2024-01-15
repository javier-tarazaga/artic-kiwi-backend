import { ObjectId } from 'mongodb';

export interface AnswerPersistedEntity {
  _id: ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  userId: ObjectId;
}

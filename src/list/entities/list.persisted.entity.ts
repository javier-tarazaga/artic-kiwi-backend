import { ObjectId } from 'mongodb';
import { AnswerPersistedEntity } from './answer.persisted.entity';

export interface ListPersistedEntity {
  _id: ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: ObjectId;
  answers: AnswerPersistedEntity[];
}

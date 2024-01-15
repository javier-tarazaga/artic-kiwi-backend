import { ObjectId } from 'mongodb';

export interface TaskPersistedEntity {
  _id: ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListPersistedEntity {
  _id: ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: ObjectId;
  tasks: TaskPersistedEntity[];
}

import { Identifier } from './identifier';
import { ObjectId } from 'mongodb';

export class UniqueEntityID extends Identifier<ObjectId> {
  constructor(id?: ObjectId | string) {
    super(new ObjectId(id) || new ObjectId());
  }
}

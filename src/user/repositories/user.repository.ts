import { Injectable } from '@nestjs/common';
import { User } from '../domain';
import { UserMapper } from '../mappers';
import { UserPersistedEntity } from '../entities';
import { Db, ObjectId } from 'mongodb';
import { UniqueEntityID } from '@artic-kiwi/backend-core';

@Injectable()
export class UserRepository {
  private readonly collection =
    this.client.collection<UserPersistedEntity>('users');

  constructor(
    private readonly client: Db,
    private readonly mapper: UserMapper,
  ) {}

  async findOne(id: string): Promise<User | null> {
    const user = await this.collection.findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return null;
    }

    return this.mapper.toDomain(user, new UniqueEntityID(user._id));
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.collection.findOne({
      email,
    });

    if (!user) {
      return null;
    }

    return this.mapper.toDomain(user, new UniqueEntityID(user._id));
  }

  async create(user: User): Promise<User> {
    const rawUser = this.mapper.toPersistence(user);
    const persisted = await this.collection.insertOne(rawUser);

    return this.mapper.toDomain(
      rawUser,
      new UniqueEntityID(persisted.insertedId),
    );
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.collection.deleteOne({ _id: new ObjectId(id) });

    return deleted.acknowledged;
  }
}

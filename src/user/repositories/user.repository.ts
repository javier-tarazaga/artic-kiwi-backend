import { Injectable } from '@nestjs/common';
import { User } from '../domain';
import { UserMapper } from '../mappers';
import { UserPersistedEntity } from '../entities';
import { ClientSession, Db, ObjectId } from 'mongodb';
import { UniqueEntityID } from '@app/core/domain';

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

  async findOneByHandle(handle: string): Promise<User | null> {
    const user = await this.collection.findOne({
      username: handle,
    });

    if (!user) {
      return null;
    }

    return this.mapper.toDomain(user, new UniqueEntityID(user._id));
  }

  async findBatch(offset: number, limit: number): Promise<User[]> {
    const persisted = await this.collection
      .find({})
      .skip(offset)
      .limit(limit)
      .toArray();

    return persisted.map((raw) =>
      this.mapper.toDomain(raw, new UniqueEntityID(raw._id)),
    );
  }

  async create(user: User): Promise<User> {
    const rawUser = this.mapper.toPersistence(user);
    const persisted = await this.collection.insertOne(rawUser);

    return this.mapper.toDomain(
      rawUser,
      new UniqueEntityID(persisted.insertedId),
    );
  }

  async update(user: User): Promise<User | null> {
    const rawUserCredential = this.mapper.toPersistence(user);

    await this.collection.updateOne(
      { _id: new ObjectId(user.id.toString()) },
      { $set: rawUserCredential },
    );

    return this.findOne(user.id.toString());
  }

  async delete(
    userId: UniqueEntityID,
    session?: ClientSession,
  ): Promise<boolean> {
    const deleted = await this.collection.deleteOne(
      { _id: userId.toValue() },
      { session },
    );

    return deleted.acknowledged;
  }
}

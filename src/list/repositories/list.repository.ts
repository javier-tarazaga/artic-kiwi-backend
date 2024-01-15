import { Injectable } from '@nestjs/common';
import { List } from '../domain';
import { ListPersistedEntity } from '../entities';
import { ClientSession, Db, ObjectId } from 'mongodb';
import { UniqueEntityID } from '@app/core';
import { ListMapper } from '../mappers';

@Injectable()
export class ListRepository {
  private readonly collection =
    this.client.collection<ListPersistedEntity>('lists');

  constructor(
    private readonly client: Db,
    private readonly mapper: ListMapper,
  ) {}

  async findOne(id: string): Promise<List | null> {
    const found = await this.collection.findOne({
      _id: new ObjectId(id),
    });

    if (!found) {
      return null;
    }

    return this.mapper.toDomain(found, new UniqueEntityID(found._id));
  }

  async getListsForUser(userId: UniqueEntityID): Promise<List[]> {
    const found = await this.collection
      .find({
        userId: userId.toValue(),
      })
      .toArray();

    return found.map((list) =>
      this.mapper.toDomain(list, new UniqueEntityID(list._id)),
    );
  }

  async create(list: List): Promise<List> {
    const raw = this.mapper.toPersistence(list);
    const persisted = await this.collection.insertOne(raw);

    return this.mapper.toDomain(raw, new UniqueEntityID(persisted.insertedId));
  }

  async update(list: List): Promise<List | null> {
    const raw = this.mapper.toPersistence(list);

    await this.collection.updateOne(
      { _id: new ObjectId(list.id.toString()) },
      { $set: raw },
    );

    return this.findOne(list.id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.collection.deleteOne({ _id: new ObjectId(id) });

    return deleted.acknowledged;
  }

  async delteUserLists(
    userId: UniqueEntityID,
    session?: ClientSession,
  ): Promise<boolean> {
    const deleted = await this.collection.deleteMany(
      { userId: userId.toValue() },
      { session },
    );

    return deleted.acknowledged;
  }
}

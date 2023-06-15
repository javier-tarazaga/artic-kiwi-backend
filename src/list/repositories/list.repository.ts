import { Injectable } from '@nestjs/common';
import {
  CreateListDto,
  DeleteListDto,
  ListDto,
  ListDtoWithoutId,
  UpdateListDto,
} from '../dtos';
import { MongoClient, ObjectId } from 'mongodb';
import { ListMapper } from 'src/list/mappers/list.mapper';

@Injectable()
export class ListRepository {
  constructor(
    private readonly client: MongoClient,
    private readonly mapper: ListMapper,
  ) {}

  async getList(id: string): Promise<ListDto | null> {
    const list = await this.client
      .db('artic-kiwi')
      .collection<ListDto>('lists')
      .findOne({
        _id: new ObjectId(id),
      });

    if (!list) {
      return null;
    }

    return this.mapper.toDto(list, id);
  }

  async getLists(): Promise<ListDto[]> {
    const lists = await this.client
      .db('artic-kiwi')
      .collection<ListDto>('lists')
      .find()
      .toArray();

    return lists.map((list) => this.mapper.toDto(list, list._id.toString()));
  }

  async createList(input: CreateListDto): Promise<ListDto> {
    const valueToInsert: ListDtoWithoutId = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const list = await this.client
      .db('artic-kiwi')
      .collection<Omit<ListDto, 'id'>>('lists')
      .insertOne(valueToInsert);

    return this.mapper.toDto(valueToInsert, list.insertedId.toString());
  }

  async updateList(input: UpdateListDto): Promise<ListDto> {
    const updated = await this.client
      .db('artic-kiwi')
      .collection<ListDto>('lists')
      .updateOne({ _id: new ObjectId(input.id) }, { $set: input });

    const list = await this.getList(input.id);
    return this.mapper.toDto(list, updated.upsertedId.toString());
  }

  async deleteList(input: DeleteListDto): Promise<boolean> {
    const deleted = await this.client
      .db('artic-kiwi')
      .collection<ListDto>('lists')
      .deleteOne({ _id: new ObjectId(input.id) });

    return deleted.acknowledged;
  }
}

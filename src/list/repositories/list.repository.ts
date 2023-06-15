import { Injectable } from '@nestjs/common';
import {
  AddTaskToListDto,
  CreateListDto,
  ListDto,
  ListDtoWithoutId,
  UpdateListDto,
} from '../dtos';
import { MongoClient, ObjectId } from 'mongodb';
import { TaskListMapper } from 'src/list/dtos/mappers/tasl-list.mapper';

@Injectable()
export class ListRepository {
  constructor(
    private readonly client: MongoClient,
    private readonly mapper: TaskListMapper,
  ) {}

  async getList(id: string): Promise<ListDto> {
    const list = await this.client
      .db('artic-kiwi')
      .collection<ListDto>('lists')
      .findOne({
        _id: new ObjectId(id),
      });

    return this.mapper.toDto(list, id);
  }

  async getLists(): Promise<ListDto[]> {
    const lists = await this.client
      .db('artic-kiwi')
      .collection<ListDto>('lists')
      .find()
      .toArray();

    return lists.map((taskList) =>
      this.mapper.toDto(taskList, taskList._id.toString()),
    );
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

  async addTaskToList(input: AddTaskToListDto): Promise<ListDto> {
    const updated = await this.client
      .db('artic-kiwi')
      .collection<ListDto>('lists')
      .updateOne(
        { _id: new ObjectId(input.listId) },
        { $push: { tasks: input.task } },
      );

    const list = await this.getList(input.listId);
    return this.mapper.toDto(list, updated.upsertedId.toString());
  }
}

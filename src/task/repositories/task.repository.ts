import { Injectable } from '@nestjs/common';
import {
  CreateTaskDto,
  DeleteTaskDto,
  TaskDto,
  TaskDtoWithoutId,
  UpdateTaskDto,
} from '../dtos';
import { MongoClient, ObjectId } from 'mongodb';
import { TaskMapper } from '../mappers';

@Injectable()
export class TaskRepository {
  constructor(
    private readonly client: MongoClient,
    private readonly mapper: TaskMapper,
  ) {}

  async getTask(id: string): Promise<TaskDto> {
    const list = await this.client
      .db('artic-kiwi')
      .collection<TaskDto>('tasks')
      .findOne({
        _id: new ObjectId(id),
      });

    return this.mapper.toDto(list, id);
  }

  async getTasksForList(listId: string): Promise<TaskDto[]> {
    const tasks = await this.client
      .db('artic-kiwi')
      .collection<TaskDto>('tasks')
      .find({ listId })
      .toArray();

    return tasks.map((task) => this.mapper.toDto(task, task._id.toString()));
  }

  async createTask(input: CreateTaskDto): Promise<TaskDto> {
    const valueToInsert: TaskDtoWithoutId = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const list = await this.client
      .db('artic-kiwi')
      .collection<TaskDtoWithoutId>('tasks')
      .insertOne(valueToInsert);

    return this.mapper.toDto(valueToInsert, list.insertedId.toString());
  }

  async updateTask(input: UpdateTaskDto): Promise<TaskDto> {
    const updated = await this.client
      .db('artic-kiwi')
      .collection<TaskDto>('tasks')
      .updateOne({ _id: new ObjectId(input.id) }, { $set: input });

    const list = await this.getTask(input.id);
    return this.mapper.toDto(list, updated.upsertedId.toString());
  }

  async deleteTask(input: DeleteTaskDto): Promise<boolean> {
    const deleted = await this.client
      .db('artic-kiwi')
      .collection<TaskDto>('tasks')
      .deleteOne({ _id: new ObjectId(input.id) });

    return deleted.acknowledged;
  }
}

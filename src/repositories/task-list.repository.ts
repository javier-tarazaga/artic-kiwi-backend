import { Injectable } from '@nestjs/common';
import {
  CreateTaskListDto,
  TaskListDto,
  TaskListDtoWithoutId,
  UpdateTaskListDto,
} from '../dtos';
import { MongoClient, ObjectId } from 'mongodb';
import { TaskListMapper } from 'src/mappers/tasl-list.mapper';

@Injectable()
export class TaskListRepository {
  constructor(
    private readonly client: MongoClient,
    private readonly mapper: TaskListMapper,
  ) {}

  async getTaskLists(): Promise<TaskListDto[]> {
    const taskLists = await this.client
      .db('artic-kiwi')
      .collection<TaskListDto>('task-lists')
      .find()
      .toArray();

    return taskLists.map((taskList) =>
      this.mapper.toDto(taskList, taskList._id.toString()),
    );
  }

  async createTaskList(input: CreateTaskListDto): Promise<TaskListDto> {
    const valueToInsert: TaskListDtoWithoutId = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const taskList = await this.client
      .db('artic-kiwi')
      .collection<Omit<TaskListDto, 'id'>>('task-lists')
      .insertOne(valueToInsert);

    return this.mapper.toDto(valueToInsert, taskList.insertedId.toString());
  }

  async updateTaskList(input: UpdateTaskListDto): Promise<TaskListDto> {
    const updated = await this.client
      .db('artic-kiwi')
      .collection<TaskListDto>('task-lists')
      .updateOne({ _id: new ObjectId(input.id) }, { $set: input });

    const taskList = await this.client
      .db('artic-kiwi')
      .collection<TaskListDto>('task-lists')
      .findOne({
        _id: updated.upsertedId,
      });

    return this.mapper.toDto(taskList, updated.upsertedId.toString());
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from '../dtos';
import { TaskRepository } from '../repositories';
import { ListService } from 'src/list/services';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly listService: ListService,
  ) {}

  async getListTasks(listId: string): Promise<TaskDto[]> {
    return this.taskRepository.getTasksForList(listId);
  }

  async getTask(id: string): Promise<TaskDto> {
    return this.taskRepository.getTask(id);
  }

  async createTask(input: CreateTaskDto): Promise<TaskDto> {
    // Let first make sure the list exists before we try to insert a task
    await this.listService.getList(input.listId);
    return this.taskRepository.createTask(input);
  }

  async updateTask(input: UpdateTaskDto): Promise<TaskDto> {
    return this.taskRepository.updateTask(input);
  }
}

import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories';
import { ListService } from 'src/list/services';

@Injectable()
export class UserService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly listService: ListService,
  ) {}

  async createUser(input: CreateTaskDto): Promise<TaskDto> {
    // Let first make sure the list exists before we try to insert a task
    await this.listService.getList(input.listId);
    return this.taskRepository.createTask(input);
  }
}

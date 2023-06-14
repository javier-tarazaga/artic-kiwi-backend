import { Injectable } from '@nestjs/common';
import { CreateTaskListDto, TaskListDto, UpdateTaskListDto } from '../dtos';
import { TaskListRepository } from 'src/repositories';

@Injectable()
export class TaskService {
  constructor(private readonly taskListRepository: TaskListRepository) {}
  getTaskLists(): Promise<TaskListDto[]> {
    return this.taskListRepository.getTaskLists();
  }

  createTaskList(input: CreateTaskListDto): Promise<TaskListDto> {
    return this.taskListRepository.createTaskList(input);
  }

  updateTaskList(input: UpdateTaskListDto): Promise<TaskListDto> {
    return this.taskListRepository.updateTaskList(input);
  }
}

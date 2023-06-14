import { Injectable } from '@nestjs/common';
import { CreateTaskListDto, TaskListDto, UpdateTaskListDto } from '../dtos';

@Injectable()
export class TaskService {
  getTaskLists(): TaskListDto[] {
    return [
      {
        id: 1,
        title: 'Task List 1',
        tasks: [
          {
            id: 1,
            title: 'Task 1',
          },
        ],
      },
    ];
  }

  createTaskList(input: CreateTaskListDto): TaskListDto {
    return {
      id: 1,
      title: input.title,
      tasks: [],
    };
  }

  updateTaskList(input: UpdateTaskListDto): TaskListDto {
    return {
      id: 1,
      title: input.title,
      tasks: [],
    };
  }
}

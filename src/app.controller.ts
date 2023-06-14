import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskListDto, UpdateTaskListDto } from './dtos';
import { JoiValidationPipe } from '@app/core';
import { CreateTaskListDto } from './dtos/create-task-list.dto';
import { createTaskListSchema, updateTaskListSchema } from './schemas';

@Controller('taskList')
export class AppController {
  constructor(private readonly appService: TaskService) {}

  @Get(':id')
  getTaskList(): TaskListDto[] {
    return this.appService.getTaskLists();
  }

  @Post()
  createTaskList(
    @Body(new JoiValidationPipe(createTaskListSchema)) input: CreateTaskListDto,
  ): TaskListDto {
    return this.appService.createTaskList(input);
  }

  @Patch(':id')
  updateTaskList(
    @Param('id') id: number,
    @Body(new JoiValidationPipe(updateTaskListSchema)) input: UpdateTaskListDto,
  ): TaskListDto {
    return this.appService.updateTaskList({
      ...input,
      id,
    });
  }
}

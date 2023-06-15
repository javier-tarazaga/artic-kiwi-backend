import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dtos';
import { JoiValidationPipe } from '@app/core';
import { creatTaskSchema, updateTaskSchema } from './schemas';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  getTask(@Param('id') id: string): Promise<TaskDto> {
    return this.taskService.getTask(id);
  }

  @Post()
  createList(
    @Body(new JoiValidationPipe(creatTaskSchema)) input: CreateTaskDto,
  ): Promise<TaskDto> {
    return this.taskService.createTask(input);
  }

  @Patch(':id')
  updateList(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(updateTaskSchema)) input: UpdateTaskDto,
  ): Promise<TaskDto> {
    return this.taskService.updateTask({
      ...input,
      id,
    });
  }
}

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from 'src/task/services';
import {
  CreateTaskInput,
  DeleteTaskInput,
  Task,
  UpdateTaskInput,
} from './task.model';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskInput) {
    return this.taskService.createTask(input);
  }

  @Mutation(() => Task)
  async updateList(@Args('input') input: UpdateTaskInput) {
    return this.taskService.updateTask(input);
  }

  @Mutation(() => Task)
  async deleteList(@Args('input') input: DeleteTaskInput) {
    return this.taskService.deleteTask(input);
  }
}

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ListService } from 'src/list/services';
import { TaskService } from 'src/task/services';
import {
  CreateTaskInput,
  DeleteTaskInput,
  Task,
  UpdateTaskInput,
} from './task.model';

@Resolver(() => Task)
export class ListResolver {
  constructor(
    private listService: ListService,
    private taskService: TaskService,
  ) {}

  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskInput) {
    return this.listService.createList(input);
  }

  @Mutation(() => Task)
  async updateList(@Args('input') input: UpdateTaskInput) {
    return this.listService.updateList(input);
  }

  @Mutation(() => Task)
  async deleteList(@Args('input') input: DeleteTaskInput) {
    return this.listService.deleteList(input);
  }
}

import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
import {
  CreateListInput,
  DeleteListInput,
  List,
  UpdateListInput,
} from './list.model';
import { ListService } from 'src/list/services';
import { TaskService } from 'src/task/services';

@Resolver(() => List)
export class ListResolver {
  constructor(
    private listService: ListService,
    private taskService: TaskService,
  ) {}

  @Query(() => [List])
  async lists() {
    return this.listService.getLists();
  }

  @Mutation(() => List)
  async createList(@Args('input') input: CreateListInput) {
    return this.listService.createList(input);
  }

  @Mutation(() => List)
  async updateList(@Args('input') input: UpdateListInput) {
    return this.listService.updateList(input);
  }

  @Mutation(() => List)
  async deleteList(@Args('input') input: DeleteListInput) {
    return this.listService.deleteList(input);
  }

  @ResolveField()
  async tasks(@Parent() list: List) {
    const { id } = list;
    return this.taskService.getListTasks(id);
  }
}

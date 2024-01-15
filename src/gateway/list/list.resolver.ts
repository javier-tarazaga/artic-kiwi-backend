import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import {
  CreateListInput,
  DeleteListInput,
  List,
  UpdateListInput,
} from './list.model';
import { ListService } from 'src/list/services';
import { UserDto, ListDto } from '@app/common';

@Resolver(() => List)
export class ListResolver {
  constructor(private listService: ListService) {}

  @Query(() => List)
  lists(@Context('me') me: UserDto): Promise<ListDto[]> {
    return this.listService.findForUser(me.id);
  }

  @Mutation(() => List)
  async createList(
    @Args('input') input: CreateListInput,
    @Context('me') me: UserDto,
  ) {
    return this.listService.createList({
      ...input,
      userId: me.id,
    });
  }

  @Mutation(() => List)
  async updateList(
    @Args('input') input: UpdateListInput,
    @Context('me') me: UserDto,
  ) {
    return this.listService.updateList({
      ...input,
      userId: me.id,
    });
  }

  @Mutation(() => List)
  async deleteList(
    @Args('input') input: DeleteListInput,
    @Context('me') me: UserDto,
  ) {
    return this.listService.deleteList({
      ...input,
      userId: me.id,
    });
  }
}

import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserService } from 'src/user/services';
import { User, UpdateUserInput } from './models';
import { UserDto } from '@app/common';
import { UserDeletionService } from 'src/user-deletion/services';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userDeletionService: UserDeletionService,
  ) {}

  @Query(() => User)
  me(@Context('me') me: UserDto): Promise<UserDto> {
    return this.userService.findOne(me.id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @Context('me') me: UserDto,
  ) {
    return this.userService.updateUser(me.id, input);
  }

  @Mutation(() => User)
  async deleteAccount(@Context('me') me: UserDto): Promise<UserDto> {
    return this.userDeletionService.deleteUser(me.id);
  }
}

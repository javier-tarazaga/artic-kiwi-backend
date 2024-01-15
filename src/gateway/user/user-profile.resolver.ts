import { Resolver, Args, Query } from '@nestjs/graphql';
import { UserService } from 'src/user/services';
import { UserProfile } from './models';
import { UserDto } from '@app/common';

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserProfile)
  userProfile(@Args('userId') userId: string): Promise<UserDto> {
    return this.userService.findOne(userId);
  }
}

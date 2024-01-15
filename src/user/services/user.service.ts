import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { UserRepository } from '../repositories';
import { UserMapper } from '../mappers';
import { User } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { UserDto } from '@artic-kiwi/common';
import { ServerException, ServerError } from '@artic-kiwi/server-errors';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly mapper: UserMapper,
    private readonly publisher: EventPublisher,
  ) {}

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new ServerException({
        error: ServerError.Common.NotFound,
        message: 'User not found',
      });
    }
    return this.mapper.toDto(user);
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepo.findOneByEmail(email);
    if (!user) {
      throw new ServerException({
        error: ServerError.Common.NotFound,
        message: 'User not found',
      });
    }
    return this.mapper.toDto(user);
  }

  async createUser(input: CreateUserDto): Promise<UserDto> {
    const newUser = this.publisher.mergeObjectContext(
      User.create({
        ...input,
        termsAcceptedAt: new Date(), // Hardcoded for now since the user will automatically acccept the terms when signing up with Apple
      }),
    );

    const userCreated = await this.userRepo.create(newUser);

    newUser.commit();

    return this.mapper.toDto(userCreated);
  }
}

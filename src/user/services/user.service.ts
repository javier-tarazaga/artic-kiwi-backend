import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UserRepository } from '../repositories';
import { ServerException, ServerError } from '@app/server-errors';
import { UserMapper } from '../mappers';
import { UserHandleGeneratorService } from './user-handle-generator.service';
import { User } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { UniqueEntityID } from '@app/core';
import { UserDto } from '@app/common';
import { ClientSession } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly mapper: UserMapper,
    private readonly userHandleGeneratorService: UserHandleGeneratorService,
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

  async createUser(input: CreateUserDto): Promise<UserDto> {
    let handle: string;
    let user: User | null;

    // Generate handles until a unique one is found
    do {
      handle = this.userHandleGeneratorService.generateRandomHandle();
      user = await this.userRepo.findOneByHandle(handle);
    } while (user);

    const newUser = this.publisher.mergeObjectContext(
      User.create({
        ...input,
        username: handle,
        termsAcceptedAt: new Date(), // Hardcoded for now since the user will automatically acccept the terms when signing up with Apple
      }),
    );

    const userCreated = await this.userRepo.create(newUser);

    newUser.commit();

    return this.mapper.toDto(userCreated);
  }

  async updateUser(id: string, input: UpdateUserDto): Promise<UserDto> {
    const userDomain = await this.userRepo.findOne(id);
    if (!userDomain) {
      throw new ServerException({
        error: ServerError.User.NotFound,
        message: 'User not found',
      });
    }

    const user = this.publisher.mergeObjectContext(userDomain);

    user.update(input);

    const updatedUser = await this.userRepo.update(user);
    if (!updatedUser) {
      throw new ServerException({
        error: ServerError.User.NotFound,
        message: 'User not found',
      });
    }

    user.commit();

    return this.mapper.toDto(updatedUser);
  }

  async deleteUser(userId: string, session?: ClientSession): Promise<void> {
    await this.userRepo.delete(new UniqueEntityID(userId), session);
  }
}

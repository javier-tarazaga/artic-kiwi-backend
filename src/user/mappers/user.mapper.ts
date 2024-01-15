import { UniqueEntityID } from '@app/core';
import { Injectable } from '@nestjs/common';
import { User } from '../domain';
import { UserPersistedEntity } from '../entities';
import { UserDto } from '@app/common';

@Injectable()
export class UserMapper {
  public toPersistence(user: User): UserPersistedEntity {
    return {
      _id: user.id.toValue(),
      username: user.handle,
      email: user.email,
      emailVerified: user.emailVerified,
      termsAcceptedAt: user.termsAcceptedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      notificationsToken: user.notificationsToken,
      lastLoggedInAt: user.lastLoggedInAt,
    };
  }

  public toDomain(
    persisted: UserPersistedEntity,
    insertedId: UniqueEntityID,
  ): User {
    const user = User.create(
      {
        username: persisted.username,
        email: persisted.email,
        emailVerified: persisted.emailVerified,
        termsAcceptedAt: persisted.termsAcceptedAt,
        createdAt: persisted.createdAt,
        updatedAt: persisted.updatedAt,
        notificationsToken: persisted.notificationsToken,
        lastLoggedInAt: persisted.lastLoggedInAt,
      },
      insertedId,
    );

    return user;
  }

  public toDto(domain: User): UserDto {
    return {
      id: domain.id.toString(),
      username: domain.handle,
      email: domain.email,
      emailVerified: domain.emailVerified,
      termsAcceptedAt: domain.termsAcceptedAt,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      notificationsToken: domain.notificationsToken,
      lastLoggedInAt: domain.lastLoggedInAt,
    };
  }
}

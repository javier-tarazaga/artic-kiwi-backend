import { Injectable } from '@nestjs/common';
import { User } from '../domain';
import { UserPersistedEntity } from '../entities';
import { UniqueEntityID } from '@artic-kiwi/backend-core';
import { UserDto } from '@artic-kiwi/common';

@Injectable()
export class UserMapper {
  public toPersistence(domain: User): UserPersistedEntity {
    return {
      _id: domain.id.toValue(),
      username: domain.handle,
      email: domain.email,
      emailVerified: domain.emailVerified,
      termsAcceptedAt: domain.termsAcceptedAt,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      picture: domain.picture,
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
        picture: persisted.picture,
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
      picture: domain.picture,
    };
  }
}

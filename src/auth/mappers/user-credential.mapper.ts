import { UniqueEntityID } from '@app/core/domain/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { UserCredential } from '../domain/user-credential';
import { UserCredentialPersistedEntity } from '../entities';
import { UserCredentialDto } from '../dtos';

@Injectable()
export class UserCredentialMapper {
  public toPersistence(
    userCredential: UserCredential,
  ): UserCredentialPersistedEntity {
    return {
      _id: userCredential.id.toValue(),
      createdAt: userCredential.createdAt,
      updatedAt: userCredential.updatedAt,
      providerId: userCredential.providerId,
      providerType: userCredential.providerType,
      userId: userCredential.userId.toValue(),
    };
  }

  public toDtoFromPersistence(
    entity: UserCredentialPersistedEntity,
  ): UserCredentialDto {
    return {
      id: entity._id.toString(),
      userId: entity.userId.toString(),
      providerId: entity.providerId,
      providerType: entity.providerType,
    };
  }

  public toDomain(
    persisted: UserCredentialPersistedEntity,
    insertedId: UniqueEntityID,
  ): UserCredential {
    const user = UserCredential.create(
      {
        userId: new UniqueEntityID(persisted.userId),
        providerId: persisted.providerId,
        providerType: persisted.providerType,
        createdAt: persisted.createdAt,
        updatedAt: persisted.updatedAt,
      },
      insertedId,
    );

    return user;
  }

  public toDto(userCredential: UserCredential): UserCredentialDto {
    return {
      id: userCredential.id.toString(),
      userId: userCredential.userId.toString(),
      providerId: userCredential.providerId,
      providerType: userCredential.providerType,
    };
  }
}

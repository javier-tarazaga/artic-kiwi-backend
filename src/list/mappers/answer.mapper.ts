import { Injectable } from '@nestjs/common';
import { Answer } from '../domain';
import { AnswerPersistedEntity } from '../entities';
import { UniqueEntityID } from '@artic-kiwi/backend-core';
import { AnswerDto } from '@artic-kiwi/common';

@Injectable()
export class AnswerMapper {s
  public toPersistence(
    domain: Answer,
  ): AnswerPersistedEntity {
    return {
      _id: domain.id.toValue(),
      userId: domain.userId.toValue(),
      text: domain.text,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public toDomain(
    persisted: AnswerPersistedEntity,
    insertedId: UniqueEntityID,
  ): Answer {
    const domain = Answer.create(
      {
        text: persisted.text,
        userId: new UniqueEntityID(persisted.userId),
        createdAt: persisted.createdAt,
        updatedAt: persisted.updatedAt,
      },
      insertedId,
    );

    return domain;
  }

  public toDto(domain: Answer): AnswerDto {
    return {
      id: domain.id.toString(),
      text: domain.text,
      userId: domain.userId.toString(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { List } from '../domain';
import { ListPersistedEntity } from '../entities';
import { AnswerMapper } from './answer.mapper';
import { UniqueEntityID } from '@artic-kiwi/backend-core';
import { ListDto } from '@artic-kiwi/common';

@Injectable()
export class ListMapper {
  constructor(
    private readonly answerMapper: AnswerMapper,
  ) {}

  public toPersistence(
    domain: List,
  ): ListPersistedEntity {
    return {
      _id: domain.id.toValue(),
      userId: domain.userId.toValue(),
      title: domain.title,
      answers: domain.answers.map((answer) => this.answerMapper.toPersistence(answer)),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public toDomain(
    persisted: ListPersistedEntity,
    insertedId: UniqueEntityID,
  ): List {
    const domain = List.create(
      {
        userId: new UniqueEntityID(persisted.userId),
        answers: persisted.answers.map((answer) => this.answerMapper.toDomain(answer, new UniqueEntityID(answer._id))),
        title: persisted.title,
        createdAt: persisted.createdAt,
        updatedAt: persisted.updatedAt,
      },
      insertedId,
    );

    return domain;
  }

  public toDto(domain: List): ListDto {
    return {
      id: domain.id.toString(),
      userId: domain.userId.toString(),
      title: domain.title,
      answers: domain.answers.map((answer) => this.answerMapper.toDto(answer)),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}

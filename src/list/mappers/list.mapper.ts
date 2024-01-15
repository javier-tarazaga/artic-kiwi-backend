import { Injectable } from '@nestjs/common';
import { List } from '../domain';
import { ListPersistedEntity } from '../entities';
import { TaskMapper } from './task.mapper';
import { UniqueEntityID } from '@app/core';
import { ListDto } from '@app/common';

@Injectable()
export class ListMapper {
  constructor(private readonly taskMapper: TaskMapper) {}

  public toPersistence(domain: List): ListPersistedEntity {
    return {
      _id: domain.id.toValue(),
      userId: domain.userId.toValue(),
      title: domain.title,
      tasks: domain.tasks.map((answer) =>
        this.taskMapper.toPersistence(answer),
      ),
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
        tasks: persisted.tasks.map((answer) =>
          this.taskMapper.toDomain(answer, new UniqueEntityID(answer._id)),
        ),
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
      tasks: domain.tasks.map((answer) => this.taskMapper.toDto(answer)),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}

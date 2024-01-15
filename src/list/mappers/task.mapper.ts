import { Injectable } from '@nestjs/common';
import { Task } from '../domain';
import { TaskPersistedEntity } from '../entities';
import { UniqueEntityID } from '@app/core';
import { TaskDto } from '@app/common';

@Injectable()
export class TaskMapper {
  public toPersistence(domain: Task): TaskPersistedEntity {
    return {
      _id: domain.id.toValue(),
      text: domain.text,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public toDomain(
    persisted: TaskPersistedEntity,
    insertedId: UniqueEntityID,
  ): Task {
    const domain = Task.create(
      {
        text: persisted.text,
        createdAt: persisted.createdAt,
        updatedAt: persisted.updatedAt,
      },
      insertedId,
    );

    return domain;
  }

  public toDto(domain: Task): TaskDto {
    return {
      id: domain.id.toString(),
      text: domain.text,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}

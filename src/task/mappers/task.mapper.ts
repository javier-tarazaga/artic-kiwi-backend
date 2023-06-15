import { Injectable } from '@nestjs/common';
import { TaskDto, TaskDtoWithoutId } from '../dtos';

@Injectable()
export class TaskMapper {
  toDto(dto: TaskDtoWithoutId, insertedId: string): TaskDto {
    return {
      id: insertedId,
      title: dto.title,
      listId: dto.listId,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }
}

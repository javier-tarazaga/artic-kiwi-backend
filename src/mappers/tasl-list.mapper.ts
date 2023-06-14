import { Injectable } from '@nestjs/common';
import { TaskListDto, TaskListDtoWithoutId } from '../dtos';

@Injectable()
export class TaskListMapper {
  toDto(dto: TaskListDtoWithoutId, insertedId: string): TaskListDto {
    return {
      id: insertedId,
      title: dto.title,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      tasks: [],
    };
  }
}

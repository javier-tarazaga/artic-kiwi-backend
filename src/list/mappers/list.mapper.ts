import { Injectable } from '@nestjs/common';
import { ListDto, ListDtoWithoutId } from '../dtos';

@Injectable()
export class ListMapper {
  toDto(dto: ListDtoWithoutId, insertedId: string): ListDto {
    return {
      id: insertedId,
      title: dto.title,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }
}

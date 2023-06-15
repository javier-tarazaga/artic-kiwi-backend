import { Injectable } from '@nestjs/common';
import { CreateListDto, ListDto, UpdateListDto } from '../dtos';
import { ListRepository } from 'src/list/repositories';
import { ArticKiwiError, ArticKiwiException } from '@app/server-errors';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  getList(id: string): Promise<ListDto> {
    const list = this.listRepository.getList(id);

    if (!list) {
      throw new ArticKiwiException({
        error: ArticKiwiError.Common.NotFound,
        message: `List with id ${id} not found`,
      });
    }

    return list;
  }

  getLists(): Promise<ListDto[]> {
    return this.listRepository.getLists();
  }

  createList(input: CreateListDto): Promise<ListDto> {
    return this.listRepository.createList(input);
  }

  updateList(input: UpdateListDto): Promise<ListDto> {
    return this.listRepository.updateList(input);
  }
}

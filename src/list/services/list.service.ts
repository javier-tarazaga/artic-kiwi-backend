import { Injectable } from '@nestjs/common';
import { CreateListDto, ListDto, UpdateListDto } from '../dtos';
import { ListRepository } from 'src/list/repositories';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  getList(id: string): Promise<ListDto> {
    return this.listRepository.getList(id);
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

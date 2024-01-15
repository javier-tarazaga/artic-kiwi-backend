import { Injectable } from '@nestjs/common';
import { CreateListDto, DeleteListDto, UpdateListDto } from '../dtos';
import { ListRepository } from '../repositories';
import { ServerException, ServerError } from '@app/server-errors';
import { List } from '../domain';
import { UniqueEntityID } from '@app/core';
import { ListDto } from '@app/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ListMapper } from '../mappers';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepo: ListRepository,
    private readonly mapper: ListMapper,
    private readonly publisher: EventPublisher,
  ) {}

  async findForUser(userId: string): Promise<ListDto[]> {
    const lists = await this.listRepo.getListsForUser(userId);
    return lists.map(this.mapper.toDto);
  }

  async createList(input: CreateListDto): Promise<ListDto> {
    const newList = this.publisher.mergeObjectContext(
      List.create({
        ...input,
        userId: new UniqueEntityID(input.userId),
        tasks: [],
      }),
    );

    const created = await this.listRepo.create(newList);

    newList.commit();

    return this.mapper.toDto(created);
  }

  async updateList(input: UpdateListDto): Promise<ListDto> {
    const domain = await this.listRepo.findOne(input.listId);
    if (!domain) {
      throw new ServerException({
        error: ServerError.Common.NotFound,
        message: 'List not found',
      });
    }

    const list = this.publisher.mergeObjectContext(domain);

    list.update(input);

    const updated = await this.listRepo.update(list);
    if (!updated) {
      throw new ServerException({
        error: ServerError.User.NotFound,
        message: 'List not found',
      });
    }

    list.commit();

    return this.mapper.toDto(updated);
  }

  async deleteList(input: DeleteListDto): Promise<ListDto> {
    const domain = await this.listRepo.findOne(input.listId);
    if (!domain) {
      throw new ServerException({
        error: ServerError.Common.NotFound,
        message: 'List not found',
      });
    }

    if (domain.userId.toString() !== input.userId) {
      throw new ServerException({
        error: ServerError.Common.Unauthorized,
        message: 'Unauthorized',
      });
    }

    await this.listRepo.delete(input.listId);

    return this.mapper.toDto(domain);
  }
}

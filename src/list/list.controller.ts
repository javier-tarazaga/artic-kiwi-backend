import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ListService } from './services/list.service';
import { CreateListDto, ListDto, UpdateListDto } from './dtos';
import { JoiValidationPipe } from '@app/core';
import { createListSchema, updateListSchema } from './schemas';

@Controller('list')
export class ListController {
  constructor(private readonly appService: ListService) {}

  @Get()
  getAllList(): Promise<ListDto[]> {
    return this.appService.getLists();
  }

  @Get(':id')
  getList(@Param('id') id: string): Promise<ListDto> {
    return this.appService.getList(id);
  }

  @Post()
  createList(
    @Body(new JoiValidationPipe(createListSchema)) input: CreateListDto,
  ): Promise<ListDto> {
    return this.appService.createList(input);
  }

  @Patch(':id')
  updateList(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(updateListSchema)) input: UpdateListDto,
  ): Promise<ListDto> {
    return this.appService.updateList({
      ...input,
      id,
    });
  }
}

import { TaskDto } from './task.dto';

export type ListDtoWithoutId = Omit<ListDto, 'id'>;

export interface ListDto {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  tasks?: TaskDto[];
}

export type CreateListDto = Omit<ListDto, 'id' | 'createdAt' | 'updatedAt'> & {
  title: ListDto['title'];
};

export interface UpdateListDto {
  id: ListDto['title'];
  title: string;
  updatedAt: Date;
}

export interface AddTaskToListDto {
  listId: ListDto['id'];
  task: TaskDto;
}

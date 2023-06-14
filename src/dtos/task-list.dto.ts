import { TaskDto } from './task.dto';

export type TaskListDtoWithoutId = Omit<TaskListDto, 'id'>;

export interface TaskListDto {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  tasks?: TaskDto[];
}

import { TaskDto } from './task.dto';

export interface TaskListDto {
  id: number;
  title: string;
  tasks: TaskDto[];
}

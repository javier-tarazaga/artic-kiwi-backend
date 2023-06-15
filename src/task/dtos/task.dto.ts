export type TaskDtoWithoutId = Omit<TaskDto, 'id'>;

export interface TaskDto {
  id: string;
  title: string;
  listId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTaskDto = Omit<TaskDto, 'id' | 'createdAt' | 'updatedAt'> & {
  title: TaskDto['title'];
  listId: TaskDto['listId'];
};

export interface UpdateTaskDto {
  id: TaskDto['title'];
  title: string;
  updatedAt: Date;
}

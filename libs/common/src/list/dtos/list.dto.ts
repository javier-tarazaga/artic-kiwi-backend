export interface TaskDto {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListDto {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tasks: TaskDto[];
}

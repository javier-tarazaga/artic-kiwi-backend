export type ListDtoWithoutId = Omit<ListDto, 'id'>;

export interface ListDto {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateListDto = Omit<ListDto, 'id' | 'createdAt' | 'updatedAt'> & {
  title: ListDto['title'];
};

export interface UpdateListDto {
  id: ListDto['title'];
  title: string;
}

export interface DeleteListDto {
  id: ListDto['title'];
}

import Joi from 'joi';
import { CreateListDto, UpdateListDto } from 'src/dtos';

export type UpdateUserGameInputDto = Omit<UpdateListDto, 'id' | 'userId'>;

export const createListSchema = Joi.object<CreateListDto>({
  title: Joi.string().required(),
});

export const updateListSchema = createListSchema.append({
  id: Joi.string().required(),
});

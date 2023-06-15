import Joi from 'joi';
import { CreateListDto } from 'src/list/dtos';

export const createListSchema = Joi.object<CreateListDto>({
  title: Joi.string().required(),
});

export const updateListSchema = createListSchema.append({
  id: Joi.string().required(),
});

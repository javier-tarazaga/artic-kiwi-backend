import Joi from 'joi';
import { CreateTaskDto } from '../dtos';

export const creatTaskSchema = Joi.object<CreateTaskDto>({
  title: Joi.string().required(),
  listId: Joi.string().required(),
});

export const updateTaskSchema = creatTaskSchema
  .fork(['title', 'listId'], (schema) => schema.optional())
  .append({
    id: Joi.string().required(),
  });

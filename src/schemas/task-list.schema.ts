import Joi from 'joi';
import { CreateTaskListDto, UpdateTaskListDto } from 'src/dtos';

export type UpdateUserGameInputDto = Omit<UpdateTaskListDto, 'id' | 'userId'>;

export const createTaskListSchema = Joi.object<CreateTaskListDto>({
  title: Joi.string().required(),
});

export const updateTaskListSchema = createTaskListSchema.append({
  id: Joi.string().uuid().required(),
});

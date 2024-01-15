import { PipeTransform, Injectable } from '@nestjs/common';
import { ServerException, ServerError } from '@app/server-errors';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error, value: transformed } = this.schema.validate(value);
    if (error) {
      throw new ServerException({
        message: error.message,
        data: error.details[0],
        error: ServerError.Common.BadRequest,
      });
    }

    return transformed;
  }
}

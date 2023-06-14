import { PipeTransform, Injectable } from '@nestjs/common';
import { ArticKiwiException, ArticKiwiError } from '@app/server-errors';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error, value: transformed } = this.schema.validate(value);
    if (error) {
      throw new ArticKiwiException({
        message: error.message,
        data: error.details[0],
        error: ArticKiwiError.Common.BadRequest,
      });
    }

    return transformed;
  }
}

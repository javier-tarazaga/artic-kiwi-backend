import { HttpException } from '@nestjs/common';
import { ErrorType } from './artic-kiwi-error';

export interface ArticKiwiExceptionProps {
  error: ErrorType;
  data?: any;
  message?: string;
}

export class ArticKiwiException extends HttpException {
  static isNotFound(error: unknown): boolean {
    return (
      error instanceof ArticKiwiException &&
      (<ArticKiwiException>error).getStatus() === 404
    );
  }

  static isUnauthorized(error: unknown): boolean {
    return (
      error instanceof ArticKiwiException &&
      (<ArticKiwiException>error).getStatus() === 401
    );
  }

  constructor(props: ArticKiwiExceptionProps) {
    const { error, ...rest } = props;
    super(
      {
        ...error,
        ...rest,
      },
      error.statusCode,
    );
  }
}

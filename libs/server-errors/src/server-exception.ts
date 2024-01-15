import { HttpException } from '@nestjs/common';
import { ErrorType } from './server-error';

export interface ServerExceptionProps {
  error: ErrorType;
  data?: any;
  message?: string;
}

export class ServerException extends HttpException {
  static isNotFound(error: unknown): boolean {
    return (
      error instanceof ServerException &&
      (<ServerException>error).getStatus() === 404
    );
  }

  static isUnauthorized(error: unknown): boolean {
    return (
      error instanceof ServerException &&
      (<ServerException>error).getStatus() === 401
    );
  }

  constructor(props: ServerExceptionProps) {
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

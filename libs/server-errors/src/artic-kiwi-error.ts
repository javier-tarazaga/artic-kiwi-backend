import { HttpStatus } from '@nestjs/common';

export interface ErrorType {
  type: `${string}/${string}`;
  statusCode: HttpStatus;
}

export const ArticKiwiError = {
  External: {
    ExternalError: {
      type: 'external/external-error',
      statusCode: 500,
    } as ErrorType,
  },
  Internal: {
    InternalError: {
      type: 'internal/internal-error',
      statusCode: 500,
    } as ErrorType,
  },
  Common: {
    Unknown: {
      type: 'common/unknown',
      statusCode: 500,
    } as ErrorType,
    BadRequest: {
      type: 'common/bad-request',
      statusCode: 400,
    } as ErrorType,
    InvalidParameter: {
      type: 'common/invalid-parameter',
      statusCode: 422,
    } as ErrorType,
    TooManyAttempts: {
      type: 'common/too-many-attempts',
      statusCode: 429,
    } as ErrorType,
    Unauthorized: {
      type: 'common/unauthorized',
      statusCode: 401,
    } as ErrorType,
    Forbidden: {
      type: 'common/forbidden',
      statusCode: 403,
    } as ErrorType,
    Conflict: {
      type: 'common/conflict',
      statusCode: 409,
    } as ErrorType,
    NotFound: {
      type: 'common/not-found',
      statusCode: 404,
    } as ErrorType,
    Unprocessable: {
      type: 'common/unprocessable-entity',
      statusCode: 422,
    } as ErrorType,
    PreconditionFailed: {
      type: 'common/precondition-failed',
      statusCode: 412,
    } as ErrorType,
  },
};

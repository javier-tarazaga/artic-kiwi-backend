import { HttpStatus } from '@nestjs/common';

export interface ErrorType {
  type: `${string}/${string}`;
  statusCode: HttpStatus;
}

export const ServerError = {
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
  Firebase: {
    SDKError: {
      type: 'firebase/firebase-sdk-error',
      statusCode: 400,
    } as ErrorType,
    ParameterNotFound: {
      type: 'firebase/parameter-not-found',
      statusCode: 404,
    } as ErrorType,
  },
  Auth: {
    InvalidCredentials: {
      type: 'auth/invalid-credentials',
      statusCode: 401,
    } as ErrorType,
    TokenExpired: {
      type: 'auth/token-expired',
      statusCode: 401,
    } as ErrorType,
    TokenInactive: {
      type: 'auth/token-inactive',
      statusCode: 401,
    } as ErrorType,
    TokenError: {
      type: 'auth/token-error',
      statusCode: 401,
    } as ErrorType,
    ReservedUsername: {
      type: 'auth/reserved-username',
      statusCode: 401,
    } as ErrorType,
  },
  User: {
    NotFound: {
      type: 'user/user-not-found',
      statusCode: 404,
    } as ErrorType,
  },
  UserChallenge: {
    NotCompleted: {
      type: 'user-challenge/not-completed',
      statusCode: 422,
    } as ErrorType,
    RewardAlreadyClaimed: {
      type: 'user-challenge/reward-already-claimed',
      statusCode: 422,
    } as ErrorType,
  },
  Koth: {
    AlreadyHaveActive: {
      type: 'koth/already-have-active-koth',
      statusCode: 422,
    } as ErrorType,
    AlreadyClaimed: {
      type: 'koth/already-claimed',
      statusCode: 422,
    } as ErrorType,
    NoActive: {
      type: 'koth/no-active',
      statusCode: 422,
    } as ErrorType,
    UserNotParticipant: {
      type: 'koth/user-not-participant',
      statusCode: 422,
    } as ErrorType,
    AvatarSizeTooSmall: {
      type: 'koth/avatar-size-too-small',
      statusCode: 422,
    } as ErrorType,
    StepCountToKothInsufficient: {
      type: 'koth/step-count-to-koth-insufficient',
      statusCode: 422,
    } as ErrorType,
    AlreadyFinished: {
      type: 'koth/already-finished',
      statusCode: 422,
    } as ErrorType,
  },
};

import { ServerError, ServerException } from '@app/server-errors';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class IsUserAuthed implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    // Bypass the guard if marked as public
    if (isPublic) {
      return true;
    }

    const gqlCtx = GqlExecutionContext.create(context);
    if (!gqlCtx.getContext().me) {
      throw new ServerException({
        error: ServerError.Auth.InvalidCredentials,
        message: 'Not authenticated as user.',
      });
    }

    return true;
  }
}

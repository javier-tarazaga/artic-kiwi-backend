import { Injectable } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { InjectServerLogger, ServerLogger } from '@app/core';
import { UserService } from '../services';
import {
  UserAvatarSizeIncreasedEvent,
  UserChallengeClaimedEvent,
  UserChallengeCompletedEvent,
} from '@app/common';

@Injectable()
export class UserSagas {
  constructor(
    private readonly userService: UserService,
    @InjectServerLogger(UserSagas.name)
    private readonly logger: ServerLogger,
  ) {}

  @Saga()
  public onUserAvatarSizeIncreasedEvent = (
    events$: Observable<any>,
  ): Observable<void> =>
    events$.pipe(
      ofType(UserAvatarSizeIncreasedEvent),
      switchMap(async (event: UserAvatarSizeIncreasedEvent) => {
        this.logger.info(`Handling ${UserAvatarSizeIncreasedEvent}`, { event });

        await this.userService.handleUserAvatarSizeIncreased(event);

        this.logger.info(`Handled ${UserAvatarSizeIncreasedEvent}`, { event });
      }),
      catchError((err) => {
        this.logger.error(
          { err },
          `Error handling ${UserAvatarSizeIncreasedEvent}`,
        );
        return of();
      }),
    );

  @Saga()
  public onUserChallengeCompletedEvent = (
    events$: Observable<any>,
  ): Observable<void> =>
    events$.pipe(
      ofType(UserChallengeCompletedEvent),
      switchMap(async (event: UserChallengeCompletedEvent) => {
        this.logger.info(`Handling ${UserChallengeCompletedEvent}`, { event });

        await this.userService.handleUserChallengeCompleted(event);

        this.logger.info(`Handled ${UserChallengeCompletedEvent}`, { event });
      }),
      catchError((err) => {
        this.logger.error(
          { err },
          `Error handling ${UserChallengeCompletedEvent}`,
        );
        return of();
      }),
    );

  @Saga()
  public onUserChallengeClaimedEvent = (
    events$: Observable<any>,
  ): Observable<void> =>
    events$.pipe(
      ofType(UserChallengeClaimedEvent),
      switchMap(async (event: UserChallengeClaimedEvent) => {
        this.logger.info(`Handling ${UserChallengeClaimedEvent}`, { event });

        await this.userService.handleUserChallengeClaimed(event);

        this.logger.info(`Handled ${UserChallengeClaimedEvent}`, { event });
      }),
      catchError((err) => {
        this.logger.error(
          { err },
          `Error handling ${UserChallengeClaimedEvent}`,
        );
        return of();
      }),
    );
}

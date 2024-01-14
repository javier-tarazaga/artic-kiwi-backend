import { AggregateRoot } from '@app/core/domain/aggregate-root';
import { UniqueEntityID } from '@app/core/domain/unique-entity-id';
import { Guard } from '@app/core/logic/guard';
import { ServerError, ServerException } from '@app/server-errors';
import { Optional } from '@app/core';
import {
  UserCredentialAggregateCreatedEvent,
  UserCredentialAggregateUpdatedEvent,
} from './events/impl';

interface UserCredentialProps {
  userId: UniqueEntityID;
  providerType: string;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

type CreateUserCredentialProps = Optional<
  UserCredentialProps,
  'createdAt' | 'updatedAt'
>;

export class UserCredential extends AggregateRoot<UserCredentialProps> {
  get userId(): UniqueEntityID {
    return this.props.userId;
  }

  get providerType(): string {
    return this.props.providerType;
  }

  get providerId(): string {
    return this.props.providerId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(
    props: CreateUserCredentialProps,
    id?: UniqueEntityID,
  ): UserCredential {
    const guardedProps = [
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.providerType, argumentName: 'providerType' },
      { argument: props.providerId, argumentName: 'providerId' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      throw new ServerException({
        error: ServerError.Common.Unprocessable,
        message: guardResult.message,
      });
    }

    const now = new Date();
    const userCredential = new UserCredential(
      {
        ...props,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      id,
    );

    const idWasProvided = !!id;
    if (!idWasProvided) {
      userCredential.apply(
        new UserCredentialAggregateCreatedEvent(userCredential),
      );
    }

    return userCredential;
  }

  public update(props: Partial<UserCredentialProps>) {
    const guardedProps = [{ argument: props, argumentName: 'metadata' }];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      throw new ServerException({
        error: ServerError.Common.Unprocessable,
        message: guardResult.message,
      });
    }

    this.props.updatedAt = new Date();

    this.apply(new UserCredentialAggregateUpdatedEvent(this));
  }
}

import { AggregateRoot } from '@app/core/domain/aggregate-root';
import { UniqueEntityID } from '@app/core/domain/unique-entity-id';
import { Guard } from '@app/core/logic/guard';
import { Optional } from '@app/core';
import { ServerError, ServerException } from '@app/server-errors';
import {
  UserAggregateCreatedEvent,
  UserAggregateNotificationsTokenChangedEvent,
  UserAggregateUpdatedEvent,
  UserUsernameUpdatedEvent,
} from './events/impl';

interface NotificationsTokenProps {
  deviceToken: string;
  updatedAt: Date;
}

interface UserProps {
  username: string;
  email: string;
  emailVerified: boolean;
  termsAcceptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  notificationsToken?: NotificationsTokenProps;
  lastLoggedInAt?: Date;
}

type CreateUserProps = Optional<
  UserProps,
  'createdAt' | 'updatedAt' | 'notificationsToken'
> & {
  deviceToken?: string;
};

export interface UserUpdateProps {
  username?: string;
  deviceToken?: string;
  avatarBaseColorId?: string;
}

export class User extends AggregateRoot<UserProps> {
  get email(): string {
    return this.props.email;
  }

  get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  get handle(): string {
    return this.props.username;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get notificationsToken(): NotificationsTokenProps | undefined {
    return this.props.notificationsToken;
  }

  get termsAcceptedAt(): Date {
    return this.props.termsAcceptedAt;
  }

  get lastLoggedInAt(): Date | undefined {
    return this.props.lastLoggedInAt;
  }

  public static create(props: CreateUserProps, id?: UniqueEntityID): User {
    const guardedProps = [{ argument: props.username, argumentName: 'handle' }];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      throw new ServerException({
        error: ServerError.Common.Unprocessable,
        message: guardResult.message,
      });
    }

    const now = new Date();
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      id,
    );

    const idWasProvided = !!id;
    if (!idWasProvided) {
      user.apply(new UserAggregateCreatedEvent(user));
    }

    return user;
  }

  public update(props: UserUpdateProps) {
    const oldNotificationsToken = this.props.notificationsToken;

    if (props.username && props.username !== this.props.username) {
      this.props.username = props.username;
      this.apply(new UserUsernameUpdatedEvent(this));
    }

    if (
      props.deviceToken &&
      props.deviceToken !== oldNotificationsToken?.deviceToken
    ) {
      this.props.notificationsToken = {
        deviceToken: props.deviceToken,
        updatedAt: new Date(),
      };
      this.apply(new UserAggregateNotificationsTokenChangedEvent(this));
    }

    this.props.updatedAt = new Date();
    this.apply(new UserAggregateUpdatedEvent(this));
  }
}

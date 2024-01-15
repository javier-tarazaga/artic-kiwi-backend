import { Optional, UniqueEntityID, AggregateRoot } from '@artic-kiwi/backend-core';
import { UserAggregateCreatedEvent } from './events/impl';

interface UserProps {
  username: string;
  email: string;
  emailVerified: boolean;
  termsAcceptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  picture?: string;
}

type CreateUserProps = Optional<
  UserProps,
  'createdAt' | 'updatedAt'
>;

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

  get termsAcceptedAt(): Date {
    return this.props.termsAcceptedAt;
  }

  get picture(): string {
    return this.props.picture;
  }

  public static create(props: CreateUserProps, id?: UniqueEntityID): User {
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
}

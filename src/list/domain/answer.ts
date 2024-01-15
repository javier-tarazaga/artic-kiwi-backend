import { AggregateRoot, Optional, UniqueEntityID } from '@artic-kiwi/backend-core';

interface AnswerProps {
  userId: UniqueEntityID;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

type CreateAnswerProps = Optional<
AnswerProps,
  'createdAt' | 'updatedAt'
>;

export class Answer extends AggregateRoot<AnswerProps> {
  get userId(): UniqueEntityID {
    return this.props.userId;
  }

  get text(): string {
    return this.props.text;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(
    props: CreateAnswerProps,
    id?: UniqueEntityID,
  ): Answer {
    const now = new Date();
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      id,
    );

    // const idWasProvided = !!id;
    // if (!idWasProvided) {
    //   list.apply(new UserDailyProgressAggregateCreatedEvent(user));
    // }

    return answer;
  }
}


import { AggregateRoot, Optional, UniqueEntityID } from '@artic-kiwi/backend-core';
import { Answer } from './answer';

interface ListProps {
  userId: UniqueEntityID;
  answers: Answer[];
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

type CreateListProps = Optional<
  ListProps,
  'createdAt' | 'updatedAt'
>;

export interface ListUpdateProps {
  title: string;
}

export class List extends AggregateRoot<ListProps> {
  get userId(): UniqueEntityID {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  get answers(): Answer[] {
    return this.props.answers;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(
    props: CreateListProps,
    id?: UniqueEntityID,
  ): List {
    const now = new Date();
    const list = new List(
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

    return list;
  }

  public update(props: ListUpdateProps) {
    this.props.title = props.title || this.props.title;
    // this.apply(new UserDailyProgressAggregateUpdatedEvent(this, alpha));
    this.props.updatedAt = new Date();
  }

  public addAnswer(answer: Answer) {
    this.props.answers.push(answer);
  }

  public removeAnswer(id: UniqueEntityID) {
    this.props.answers = this.props.answers.filter((answer) => answer.id !== id);
  }
}


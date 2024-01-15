import { AggregateRoot, Optional, UniqueEntityID } from '@app/core';
import { Task } from './task';

interface ListProps {
  userId: UniqueEntityID;
  tasks: Task[];
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

type CreateListProps = Optional<ListProps, 'createdAt' | 'updatedAt'>;

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

  get tasks(): Task[] {
    return this.props.tasks;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: CreateListProps, id?: UniqueEntityID): List {
    const now = new Date();
    const list = new List(
      {
        ...props,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      id,
    );

    return list;
  }

  public update(props: ListUpdateProps) {
    this.props.title = props.title || this.props.title;
    // this.apply(new UserDailyProgressAggregateUpdatedEvent(this, alpha));
    this.props.updatedAt = new Date();
  }

  public addTask(task: Task) {
    this.props.tasks.push(task);
  }

  public removeTask(id: UniqueEntityID) {
    this.props.tasks = this.props.tasks.filter((task) => task.id !== id);
  }
}

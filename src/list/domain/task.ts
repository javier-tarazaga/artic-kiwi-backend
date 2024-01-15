import { AggregateRoot, Optional, UniqueEntityID } from '@app/core';

interface TaskProps {
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

type CreateTaskProps = Optional<TaskProps, 'createdAt' | 'updatedAt'>;

export class Task extends AggregateRoot<TaskProps> {
  get text(): string {
    return this.props.text;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: CreateTaskProps, id?: UniqueEntityID): Task {
    const now = new Date();
    const task = new Task(
      {
        ...props,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      id,
    );

    return task;
  }
}

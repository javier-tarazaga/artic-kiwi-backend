import { InternalServerErrorException } from '@nestjs/common';
import { AggregateRoot as NestJsAggregateRoot } from '@nestjs/cqrs';
import { UniqueEntityID } from './unique-entity-id';

export class AggregateRoot<T> extends NestJsAggregateRoot {
  public readonly id: UniqueEntityID;

  protected readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    super();
    if (!props) {
      throw new InternalServerErrorException(
        `Invalid parameters while creating ${this.constructor.name}`,
      );
    }

    this.id = id || new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: AggregateRoot<T>): boolean {
    const isAggregate = (v: any): v is AggregateRoot<any> =>
      v instanceof AggregateRoot;

    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isAggregate(object)) {
      return false;
    }

    return this.id.equals(object.id);
  }
}

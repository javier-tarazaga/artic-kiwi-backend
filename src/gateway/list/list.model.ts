import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Task } from './task.model';

@ObjectType()
export class List {
  @Field(() => String)
  id: string;

  @Field()
  title: string;

  @Field(() => [Task])
  tasks: Task[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@InputType()
export class CreateListInput {
  @Field()
  title: string;
}

@InputType()
export class UpdateListInput {
  @Field()
  listId!: string;

  @Field()
  title: string;
}

@InputType()
export class DeleteListInput {
  @Field()
  listId!: string;
}

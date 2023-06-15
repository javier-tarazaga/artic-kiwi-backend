import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Task } from '../task';

@ObjectType()
export class List {
  @Field(() => String)
  id: string;

  @Field()
  title: string;

  @Field(() => [Task])
  tasks: Task[];
}

@InputType()
export class CreateListInput {
  @Field()
  title: string;
}

@InputType()
export class UpdateListInput {
  @Field()
  id: string;

  @Field()
  title: string;
}

@InputType()
export class DeleteListInput {
  @Field()
  id: string;
}

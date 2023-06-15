import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => String)
  id: string;

  @Field()
  title: string;
}

@InputType()
export class CreateTaskInput {
  @Field()
  listId: string;

  @Field()
  title: string;
}

@InputType()
export class UpdateTaskInput {
  @Field()
  id: string;

  @Field()
  title: string;
}

@InputType()
export class DeleteTaskInput {
  @Field()
  id: string;
}

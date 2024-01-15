import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthTokens {
  @Field()
  token!: string;

  @Field()
  refreshToken!: string;
}

@InputType()
export class AuthWithAppleProviderInput {
  @Field()
  identityToken!: string;
}

@InputType()
export class RefreshAccessTokenInput {
  @Field()
  refreshToken!: string;
}

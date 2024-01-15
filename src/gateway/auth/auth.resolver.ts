import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  AuthTokens,
  AuthWithAppleProviderInput,
  RefreshAccessTokenInput,
} from './auth.model';
import { AuthService } from 'src/auth/services';
import { Public } from '@app/core';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => AuthTokens)
  async authWithAppleProvider(
    @Args('input') input: AuthWithAppleProviderInput,
  ) {
    return this.authService.authWithAppleProvider(input.identityToken);
  }

  @Public()
  @Mutation(() => AuthTokens)
  async refreshAccessToken(@Args('input') input: RefreshAccessTokenInput) {
    return this.authService.refreshAcessToken({
      refreshToken: input.refreshToken,
    });
  }
}

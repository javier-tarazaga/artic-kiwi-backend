import { ApolloDriverConfig, AuthenticationError } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { UserService } from 'src/user/services';
import { AuthDataDto } from 'src/auth/dtos';
import { JwtTokenService } from 'src/auth/services';
import { UserDto } from '@app/common';
import { ApolloError } from 'apollo-server-core';

export interface GraphQLContext {
  me: UserDto;
  contextType: 'request';
}

@Injectable()
export class GraphqlOptionsFactory implements GqlOptionsFactory {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userService: UserService,
  ) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/gateway/schemal.gql'),
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      path: '/graphql',
      formatError: (params) => this.formatError(params),
      context: (params: { req: any }) => this.context(params),
      cache: 'bounded',
    };
  }

  /**
   * Constructs the context for transport http protocol
   */
  private async context({ req }: { req: any }) {
    let token: string | boolean = req.headers.authorization;

    if (!token || (typeof token === 'string' && token === 'null')) {
      token = false;
    }

    const authTokenData = token
      ? await this.getAuthTokenData(req.headers.authorization)
      : null;
    const user = authTokenData ? await this.getUser(authTokenData.id) : null;

    return {
      me: user,
      contextType: 'request',
    };
  }

  /**
   * Remove some of the internal error messages when doing error reporting
   * @param err The same error reported with a formatted message
   */
  private formatError(err: GraphQLFormattedError) {
    console.error('GraphQL error occurred', err);

    const message = err.message
      .replace('Validation error: ', '')
      .replace('GraphQL error: ', '');

    const originalError: any = err.extensions && err.extensions.originalError;

    const type = originalError.type;
    const code = originalError.statusCode;

    return {
      ...err,
      message,
      type,
      extensions: {
        code: code,
      },
    };
  }

  /**
   * Decoded and verify the provided token in order to get the basic user information (user.id)
   * @param token The encoded token
   */
  private async getAuthTokenData(token: string): Promise<AuthDataDto> {
    try {
      return await this.jwtTokenService.verifyToken(token);
    } catch (error: any) {
      throw new ApolloError(error.response.message, error.status, {
        type: error.response.type,
      });
    }
  }

  private async getUser(userId: string): Promise<UserDto> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    return user;
  }

  // Let's add Redis later on when we actually do need it /**
  // private async getUser(userId: string): Promise<UserDto> {
  //   return this.cacheService.remember(
  //     userCacheKey(userId),
  //     async () => {
  //       const user = await this.userService.findOne(userId);
  //       if (!user) {
  //         throw new AuthenticationError('User not found');
  //       }

  //       return user;
  //     },
  //     { ttl: 1800 },
  //   );
  // }
}

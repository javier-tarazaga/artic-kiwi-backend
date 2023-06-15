import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { UserDto } from 'src/user';

export interface GraphQLContext {
  me: UserDto;
  contextType: 'request';
}

@Injectable()
export class GraphqlOptionsFactory implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      playground: false,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: [
        process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
          ? './**/gateway/**/*.graphql'
          : './**/*.graphql',
      ],
      path: '/graphql',
      formatError: (params) => this.formatError(params),
      context: (params) => this.context(params),
      cache: 'bounded',
    };
  }

  /**
   * Constructs the context for transport http protocol
   */
  private async context({ req }) {
    let token: string | boolean = req.headers.authorization;
    if (!token || (typeof token === 'string' && token === 'null')) {
      token = false;
    }

    // const authTokenData = token ? await this.getAuthTokenData(req.headers.authorization) : null;
    // const user = authTokenData ? await this.getUser(authTokenData.id) : null;

    return {
      me: null,
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

    const { type, ...rest } = err.extensions;
    return {
      ...err,
      message,
      type,
      extensions: {
        code: rest.code,
      },
    };
  }

  // /**
  //  * Decoded and verify the provided token in order to get the basic user information (user.id)
  //  * @param token The encoded token
  //  */
  // private async getAuthTokenData(token: string | null): Promise<AuthData> {
  //   return this.jwtTokenService.decodeAuthTokenData(token);
  // }

  // private async getUser(userId: string): Promise<UserDto> {
  //   return this.cacheService.remember(
  //     userCacheKey(userId),
  //     async () => {
  //       const user = await this.userHttpService.findOne(userId);
  //       if (!user) {
  //         throw new AuthenticationError('User not found');
  //       }

  //       return user;
  //     },
  //     { ttl: 1800 },
  //   );
  // }
}

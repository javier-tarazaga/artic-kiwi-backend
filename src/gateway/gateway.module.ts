import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptionsFactory } from './graphql/graphql-options.factory';
import { ListResolver } from './list';
import { ListModule } from 'src/list/list.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlOptionsFactory,
      imports: [AuthModule, UserModule, ListModule],
    }),
    AuthModule,
    UserModule,
    ListModule,
  ],
  providers: [ListResolver],
})
export class GatewayModule {}

import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptionsFactory } from './graphql/graphql-options.factory';
import { ListModule } from 'src/list/list.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import * as AuthResolvers from './auth';
import * as UserResolvers from './user';
import * as ListResolvers from './list';
import { UserDeletionModule } from 'src/user-deletion/user-deletion.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlOptionsFactory,
      imports: [AuthModule, UserModule, ListModule, UserDeletionModule],
    }),
    AuthModule,
    UserModule,
    ListModule,
    UserDeletionModule,
  ],
  providers: [
    ...Object.values(AuthResolvers),
    ...Object.values(UserResolvers),
    ...Object.values(ListResolvers),
  ],
})
export class GatewayModule {}

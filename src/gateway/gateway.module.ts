import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptionsFactory } from './graphql/graphql-options.factory';
import { TaskResolver } from './task';
import { ListResolver } from './list';
import { TaskModule } from 'src/task/task.module';
import { ListModule } from 'src/list/list.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlOptionsFactory,
    }),
    TaskModule,
    ListModule,
  ],
  providers: [TaskResolver, ListResolver],
})
export class GatewayModule {}

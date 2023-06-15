import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { mongoClient } from './database/mongo.client';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GatewayModule, ListModule, TaskModule],
  providers: [{ useValue: mongoClient, provide: MongoClient }],
})
export class AppModule {}

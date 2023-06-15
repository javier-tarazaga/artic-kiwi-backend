import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { mongoClient } from './database/mongo.client';
import { ListModule } from './list/list.module';

@Module({
  imports: [ListModule],
  providers: [{ useValue: mongoClient, provide: MongoClient }],
})
export class AppModule {}

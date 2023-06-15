import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { mongoClient } from './mongo.client';

@Module({
  imports: [],
  providers: [{ useValue: mongoClient, provide: MongoClient }],
  exports: [MongoClient],
})
export class DatabaseModule {}

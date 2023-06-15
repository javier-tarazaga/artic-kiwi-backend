import { Module } from '@nestjs/common';
import { ListController } from './list/list.controller';
import * as Services from './list/services';
import * as Mappers from './list/dtos/mappers';
import * as Repositories from './list/repositories';
import { MongoClient } from 'mongodb';
import { mongoClient } from './db/mongo.client';

@Module({
  imports: [],
  controllers: [ListController],
  providers: [
    { useValue: mongoClient, provide: MongoClient },
    ...Object.values(Services),
    ...Object.values(Mappers),
    ...Object.values(Repositories),
  ],
})
export class AppModule {}

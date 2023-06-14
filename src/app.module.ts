import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import * as Services from './services';
import * as Mappers from './mappers';
import * as Repositories from './repositories';
import { MongoClient } from 'mongodb';
import { mongoClient } from './db/mongo.client';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    { useValue: mongoClient, provide: MongoClient },
    ...Object.values(Services),
    ...Object.values(Mappers),
    ...Object.values(Repositories),
  ],
})
export class AppModule {}

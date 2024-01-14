import { Module } from '@nestjs/common';
import { Db, MongoClient, ServerApiVersion } from 'mongodb';

@Module({
  imports: [],
  providers: [
    {
      provide: MongoClient,
      useFactory: async () => {
        const url = process.env.DATABASE_URL ?? 'mongodb://localhost:27017';
        const client = await MongoClient.connect(url, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          },
          ignoreUndefined: true,
        });

        return client;
      },
    },
    {
      provide: Db,
      useFactory: async (client: MongoClient) => {
        return client.db('lazy-ass');
      },
      inject: [MongoClient], // Inject MongoClient into the Db provider
    },
  ],
  exports: [MongoClient, Db],
})
export class DatabaseModule {}

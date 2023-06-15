import { MongoClient, ServerApiVersion } from 'mongodb';

// console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

const url =
  'mongodb+srv://artic-kiwi:8RQVdQE2i6DYMEF2@cluster0.6bpqi62.mongodb.net/?retryWrites=true&w=majority';

export const mongoClient = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mongoClient } from './database/mongo.client';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // load .env file

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoClient.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (err) {
    console.error('MongoDB connection error: ', err);
    // Ensures that the client will close when there is an error
    await mongoClient.close();
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

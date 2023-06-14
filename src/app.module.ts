import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import * as Services from './services';
import * as Mappers from './mappers';
import * as Repositories from './repositories';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    ...Object.values(Services),
    ...Object.values(Mappers),
    ...Object.values(Repositories),
  ],
})
export class AppModule {}

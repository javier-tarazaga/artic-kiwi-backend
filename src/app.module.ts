import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import * as Services from './services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [...Object.values(Services)],
})
export class AppModule {}

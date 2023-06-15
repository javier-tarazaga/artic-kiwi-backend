import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import * as Services from './services';
import * as Mappers from './mappers';
import * as Repositories from './repositories';
import { DatabaseModule } from 'src/database/database.module';
import { ListModule } from 'src/list/list.module';

@Module({
  imports: [DatabaseModule, ListModule],
  controllers: [TaskController],
  providers: [
    ...Object.values(Services),
    ...Object.values(Mappers),
    ...Object.values(Repositories),
  ],
})
export class TaskModule {}

import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import * as Services from './services';
import * as Mappers from './mappers';
import * as Repositories from './repositories';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ListController],
  providers: [
    ...Object.values(Services),
    ...Object.values(Mappers),
    ...Object.values(Repositories),
  ],
  exports: [...Object.values(Services)],
})
export class ListModule {}

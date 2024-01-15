import { Module } from '@nestjs/common';
import * as Services from './services';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ListModule } from 'src/list/list.module';

@Module({
  imports: [DatabaseModule, CqrsModule, UserModule, AuthModule, ListModule],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class UserDeletionModule {}

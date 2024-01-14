import { Module } from '@nestjs/common';
import * as Services from './services';
import * as Mappers from './mappers';
import * as Repositories from './repositories';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from './config/auth.config';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      load: [authConfig],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.token.secret'),
      }),
    }),
  ],
  providers: [
    ...Object.values(Services),
    ...Object.values(Mappers),
    ...Object.values(Repositories),
  ],
  exports: [...Object.values(Services)],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import configuration from './apple.configuration';
import { AppleController } from './apple.controller';
import * as Services from './services';
import * as Strategies from './strategies';
import * as Mappers from './mappers';

@Module({
  imports: [
    ConfigModule.forFeature(configuration),
    PassportModule,
    AuthModule,
  ],
  controllers: [AppleController],
  providers: [
    ...Object.values(Services),
    ...Object.values(Strategies),
    ...Object.values(Mappers),
  ],
})
export class AppleModule {}

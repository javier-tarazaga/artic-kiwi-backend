import {
  Controller, Req, UseGuards, Redirect, Post, Body,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AppleLoginGuard } from './guards/apple-login.guard';
import { ValidateAppleTokenDto } from './validate-apple-token.dto';
import { AppleService } from './services';

@Controller('auth/apple')
export class AppleController {
  constructor(
    private readonly appleService: AppleService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  appleAppLogin(@Body() validateAppleTokenDto: ValidateAppleTokenDto) {
    return this.appleService.validateAppleToken(validateAppleTokenDto);
  }

  @UseGuards(AppleLoginGuard)
  @Post('login/callback')
  @Redirect()
  appleLoginCallback(@Req() req: Request) {
    const propPath = req.user!.isUserRegistered ? 'apple.app.login.redirectUrl' : 'apple.app.registration.redirectUrl';
    return {
      url: `${this.config.getOrThrow<string>(propPath)}?token=${req.user!.token}`,
    };
  }
}

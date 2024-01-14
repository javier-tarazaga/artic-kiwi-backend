import { Injectable } from '@nestjs/common';
import * as appleSignin from 'apple-signin-auth';
import { AuthService } from 'src/auth/auth.service';
import { InjectWasderLogger, WasderLogger } from '@app/core';
import { WasderError, WasderException } from '@app/server-errors';
import { ConfigService } from '@nestjs/config';
import { AppleMapper } from '../mappers/apple.mapper';
import { ValidateAppleTokenDto } from '../validate-apple-token.dto';

@Injectable()
export class AppleService {
  constructor(
    private readonly authService: AuthService,
    private readonly mapper: AppleMapper,
    readonly config: ConfigService,
    @InjectWasderLogger(AppleService.name)
    private readonly logger: WasderLogger,
  ) {}

  public async validateAppleToken(validateAppleTokenDto: ValidateAppleTokenDto): Promise<any> {
    const { identityToken, user, nonce } = validateAppleTokenDto;

    let userAppleId;
    try {
      // verify token (will throw error if failure)
      const { sub } = await appleSignin.verifyIdToken(identityToken, {
        audience: this.config.getOrThrow<string>('apple.clientId'),
        ignoreExpiration: true, // ignore token expiry (never expires)
      });
      userAppleId = sub;
    } catch (err) {
      this.logger.error({ err }, 'Error while validating apple token');
      throw new WasderException({
        error: WasderError.Auth.InvalidCredentials,
        message: 'Invalid login credentials',
      });
    }

    if (userAppleId !== user) {
      throw new WasderException({
        error: WasderError.Common.InvalidParameter,
        message: 'Users do not match',
      });
    }

    const providerAuthDto = this.mapper.toDto(identityToken, nonce, {
      email: validateAppleTokenDto.email,
      id: user,
    });
    const isUserRegistered = await this.authService.isUserRegistered({
      providerType: providerAuthDto.providerType,
      providerId: providerAuthDto.providerId,
      email: providerAuthDto.email,
    });
    const token = await this.authService.generateAccessToken(providerAuthDto);

    return {
      token,
      isUserRegistered,
    };
  }
}

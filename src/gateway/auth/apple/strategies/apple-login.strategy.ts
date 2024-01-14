import { Injectable } from '@nestjs/common';
import { Profile, Strategy } from '@nicokaiser/passport-apple';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { AppleMapper } from '../mappers/apple.mapper';

@Injectable()
export class AppleLoginStrategy extends PassportStrategy(Strategy, 'appleLogin') {
  constructor(
    private readonly authService: AuthService,
    private readonly mapper: AppleMapper,
    readonly config: ConfigService,
  ) {
    super({
      clientID: config.getOrThrow<string>('apple.clientId'),
      teamID: config.getOrThrow<string>('apple.teamId'),
      keyID: config.getOrThrow<string>('apple.keyId'),
      key: config.getOrThrow<string>('apple.key'),
      scope: config.getOrThrow<string[]>('apple.scope'),
      callbackURL: config.getOrThrow<string>('apple.callbackUrl'),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const providerAuthDto = this.mapper.toDto(accessToken, refreshToken, profile);
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

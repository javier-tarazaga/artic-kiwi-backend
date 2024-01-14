import { AuthProviderType, ProviderAuthDto } from '@app/common';
import { Mapper } from '@app/core/infra/mapper';
import { Injectable } from '@nestjs/common';
import { AppleProfile } from '../apple.profile';

@Injectable()
export class AppleMapper extends Mapper {
  public toDto(accessToken: string, refreshToken: string, profile: AppleProfile): ProviderAuthDto {
    return {
      providerId: profile.id,
      providerType: AuthProviderType.Apple,
      accessToken,
      refreshToken,
      email: profile.email,
      username: profile.email,
    };
  }
}

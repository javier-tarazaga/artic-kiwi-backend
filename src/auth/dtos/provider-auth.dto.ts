import { AuthProviderType } from '../auth-provider-type';

export interface ProviderAuthDto {
  providerId: string;
  providerType: AuthProviderType;
  email: string;
  emailVerified?: boolean;
}

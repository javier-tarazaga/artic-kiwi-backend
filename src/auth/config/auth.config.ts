import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  providerAccess: {
    secret: string;
    expirationTime: string;
  };
  token: {
    secret: string;
    expirationTime: string;
    refresExpirationTime: string;
  };
}

export default registerAs('auth', () => ({
  providerAccess: {
    secret: process.env.PROVIDER_ACCESS_TOKEN_SECRET,
    expirationTime: process.env.PROVIDER_ACCESS_TOKEN_EXPIRATION_TIME,
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expirationTime: process.env.TOKEN_EXPIRATION_TIME,
    refresExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  },
}));

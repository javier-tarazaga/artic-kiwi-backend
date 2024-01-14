import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ServerException, ServerError, ErrorType } from '@app/server-errors';
import { AuthDataDto, AuthTokensDto } from '../dtos';
import authConfig from '../config/auth.config';
import { JsonWebTokenErrorNames } from '../jwt-errors';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService,
  ) {}

  private mapError(err: JsonWebTokenError): ServerException {
    let message: string;
    let error: ErrorType;

    switch (err.name) {
      case JsonWebTokenErrorNames.EXPIRED:
        error = ServerError.Auth.TokenExpired;
        message = 'Token expired, please re-authenticate';
        break;
      case JsonWebTokenErrorNames.NOT_BEFORE:
        error = ServerError.Auth.TokenInactive;
        message = 'Token is not active';
        break;
      default:
        error = ServerError.Auth.TokenError;
        message = err.message;
        break;
    }

    return new ServerException({
      message,
      error,
    });
  }

  async createAuthTokens(userId: string): Promise<AuthTokensDto> {
    return {
      token: await this.jwtService.sign(
        { id: userId },
        {
          expiresIn: this.config.token.expirationTime,
        },
      ),
      refreshToken: await this.jwtService.sign(
        { id: userId },
        {
          expiresIn: this.config.token.refresExpirationTime,
        },
      ),
    };
  }

  async verifyToken(token: string): Promise<AuthDataDto> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw this.mapError(error as JsonWebTokenError);
    }
  }
}

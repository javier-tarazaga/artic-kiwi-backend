import { Injectable } from '@nestjs/common';
import {
  AuthTokensDto,
  IsUserRegisteredDto,
  ProviderAuthDto,
  RefreshAccessTokeDto,
} from '../dtos';
import { JwtTokenService } from './jwt-token.service';
import { UserCredentialsRepository } from '../repositories/user-credentials.repository';
import { EventPublisher } from '@nestjs/cqrs';
import { AppleService } from './apple.service';
import { AuthProviderType } from '../auth-provider-type';
import { UserCredential } from '../domain';
import { UserService } from 'src/user/services';
import { UniqueEntityID } from '@app/core/domain';
import { ClientSession } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: JwtTokenService,
    private readonly appleService: AppleService,
    private readonly credentialsRepository: UserCredentialsRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async isUserRegistered(
    isUserRegisteredDto: IsUserRegisteredDto,
  ): Promise<boolean> {
    const userCredential = await this.credentialsRepository.findOne(
      isUserRegisteredDto.providerType,
      isUserRegisteredDto.providerId,
    );

    return !!userCredential;
  }

  async refreshAcessToken(
    refreshAccessTokeDto: RefreshAccessTokeDto,
  ): Promise<AuthTokensDto> {
    const token = await this.tokenService.verifyToken(
      refreshAccessTokeDto.refreshToken,
    );

    // Even we can verify the token, we still need to make sure the user is still registered
    const user = await this.userService.findOne(token.id);

    return await this.tokenService.createAuthTokens(user.id.toString());
  }

  async authWithAppleProvider(identityToken: string): Promise<AuthTokensDto> {
    // First, make sure we decode what ever information was included in the token during the OAuth proccess
    const user = await this.appleService.verifyAppleIdentityToken(
      identityToken,
    );

    let userCredential = await this.credentialsRepository.findOne(
      AuthProviderType.Apple,
      user.appleUserId,
    );

    // If the user is already registered, we just return the tokens
    if (userCredential) {
      return this.tokenService.createAuthTokens(
        userCredential.userId.toString(),
      );
    }

    userCredential = await this.createUser({
      email: user.email,
      emailVerified: user.emailVerified,
      providerId: user.appleUserId,
      providerType: AuthProviderType.Apple,
    });

    return await this.tokenService.createAuthTokens(
      userCredential.userId.toString(),
    );
  }

  private async createUser(
    providerAuth: ProviderAuthDto,
  ): Promise<UserCredential> {
    const newUser = await this.userService.createUser({
      email: providerAuth.email,
      emailVerified: providerAuth.emailVerified ?? false,
    });

    const userCredential = this.publisher.mergeObjectContext(
      UserCredential.create({
        providerId: providerAuth.providerId,
        providerType: providerAuth.providerType,
        userId: new UniqueEntityID(newUser.id),
      }),
    );

    await this.credentialsRepository.create(userCredential);
    userCredential.commit();

    return userCredential;
  }

  async deleteUserInfo(userId: string, session?: ClientSession) {
    await this.credentialsRepository.deleteUserInfo(
      new UniqueEntityID(userId),
      session,
    );
  }
}

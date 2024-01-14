import { Injectable } from '@nestjs/common';
import axios from 'axios';
import jwkToPem from 'jwk-to-pem';
import * as jwt from 'jsonwebtoken';

export interface AppleIdentityTokenPayload {
  appleUserId: string;
  email: string;
  emailVerified: boolean;
}

@Injectable()
export class AppleService {
  async getApplePublicKeys(): Promise<{ [key: string]: string }> {
    try {
      const url = 'https://appleid.apple.com/auth/keys';
      const response = await axios.get(url);
      const keys = response.data.keys;

      const pems: { [key: string]: string } = {};
      for (const key of keys) {
        const pem = jwkToPem(key);
        pems[key.kid] = pem;
      }

      return pems;
    } catch (error) {
      console.error('Error fetching Apple public keys:', error);
      throw new Error('Error fetching Apple public keys');
    }
  }

  async verifyAppleIdentityToken(
    identityToken: string,
  ): Promise<AppleIdentityTokenPayload> {
    // Fetch Apple's public keys
    const keys = await this.getApplePublicKeys();

    // Decode the header of the JWT without verifying it to get the kid
    const decodedHeader = jwt.decode(identityToken, { complete: true }) as any;
    if (!decodedHeader) {
      throw new Error('Invalid token');
    }

    const kid = decodedHeader.header.kid;
    const pem = keys[kid];
    if (!pem) {
      throw new Error('Invalid token kid');
    }

    // Verify the identity token
    const decodedToken = <jwt.JwtPayload>jwt.verify(identityToken, pem, {
      algorithms: ['RS256'],
    });

    if (!decodedToken.sub) {
      throw new Error('Invalid token');
    }

    return {
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      appleUserId: decodedToken.sub,
    };
  }
}

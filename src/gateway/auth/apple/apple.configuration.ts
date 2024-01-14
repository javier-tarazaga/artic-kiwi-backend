import assert from 'assert';
import joi from 'joi';
import * as fs from 'fs';

export interface AppleConfiguration {
  apple: {
    teamId: string;
    keyId: string;
    key: string;
    scope: string[];
    clientId: string;
    callbackUrl: string;
  };
}

export interface LoginConfiguration {
  redirectUrl: string;
}

export interface RegistrationConfiguration {
  redirectUrl: string;
}

export interface AppConfiguration {
  login: LoginConfiguration;
  registration: RegistrationConfiguration;
}

export const AppleConfigurationSchema = joi.object<AppleConfiguration>({
  apple: joi
    .object({
      teamId: joi.string().required(),
      keyId: joi.string().required(),
      key: joi.object().required(),
      scope: joi.array().required(),
      clientId: joi.string().required(),
      callbackUrl: joi.string().required(),
      app: joi
        .object<AppConfiguration>({
          login: joi
            .object<LoginConfiguration>({
              redirectUrl: joi.string().required(),
            })
            .required(),
          registration: joi
            .object<RegistrationConfiguration>({
              redirectUrl: joi.string().required(),
            })
            .required(),
        })
        .required(),
    })
    .required(),
});

export default (): AppleConfiguration => {
  const { error, value } = AppleConfigurationSchema.validate({
    apple: {
      teamId: process.env.APPLE_TEAM_ID, // Team ID of your Apple Developer Account
      keyId: process.env.APPLE_KEY_ID, // Key ID, received from https://developer.apple.com/account/resources/authkeys/list
      key: fs.readFileSync(process.env.APPLE_KEY_PATH ?? ''), // Private key, downloaded from https://developer.apple.com/account/resources/authkeys/list,
      scope: process.env.APPLE_SCOPE?.split(',').map((item) => item.trim()),
      clientId: process.env.APPLE_CLIENT_ID, // Services ID
      callbackUrl: process.env.APPLE_CALLBACK_URL, // Callback URL
      app: {
        login: {
          redirectUrl: process.env.LOGIN_REDIRECT_URL,
        },
        registration: {
          redirectUrl: process.env.COMPLETE_REGISTRATION_URL,
        },
      },
    },
  });

  assert(!error, error);
  return value;
};

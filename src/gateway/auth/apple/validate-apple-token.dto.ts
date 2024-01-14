export interface AppleFullName {
  familyName?: string;
  givenName?: string;
  middleName?: string;
  namePrefix?: string;
  nameSuffix?: string;
  nickname?: string;
}

export interface ValidateAppleTokenDto {
  email?: string;
  fullName?: AppleFullName;
  identityToken: string;
  nonce: string;
  user: string;
}

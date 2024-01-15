export interface UserNotificationsToken {
  deviceToken: string;
  updatedAt: Date;
}

export interface UserDto {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  termsAcceptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  notificationsToken?: UserNotificationsToken;
  lastLoggedInAt?: Date;
}

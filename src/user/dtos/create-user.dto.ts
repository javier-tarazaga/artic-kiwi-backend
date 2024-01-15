export interface CreateUserDto {
  email: string;
  emailVerified: boolean;
  username: string;
  picture?: string;
}

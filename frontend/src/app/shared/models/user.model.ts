export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresInSeconds: number;
  user: UserProfile;
}

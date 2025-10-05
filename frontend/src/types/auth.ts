export type LoginRequestType = {
  username: string;
  password: string;
}
export type LoginResponseType = {
  accessToken: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}


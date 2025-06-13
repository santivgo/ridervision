export interface IUserRegister{
    username: string;
    password: string;
    re_password: string
}

interface IUserCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
}

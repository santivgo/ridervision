import { IShow } from './show.interface';

export interface IUser{
    id: BigInteger,
    username: string,
    password: string, // hashcode
    img: string, // path
}

export type IUserRegister = Omit<IUser, 'id'|'img'>
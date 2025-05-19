import { IShow } from './show.interface';

export interface IUser{
    id: BigInteger,
    username: string,
    password: string, // hashcode
    img: string, // path
    favorite_shows: IShow[],

}
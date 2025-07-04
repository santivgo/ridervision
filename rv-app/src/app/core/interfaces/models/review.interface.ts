import { IRider } from "./rider.interface";
import { IShow } from "./show.interface";
import { IUser } from "./user.interface";

export interface IReview{
    show: IShow,
    user: IUser,
    fav_riders: IRider[],
    review: string
}
import { IRider } from "./rider.interface"
import { IUser } from "./user.interface"

export interface IPost {
    id: number,
    content: string,
    date: Date,
    img: string,
    author: IUser[],
    tagged_riders: IRider[]
}
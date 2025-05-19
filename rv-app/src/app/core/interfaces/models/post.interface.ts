import { IRider } from "./rider.interface"
import { IUser } from "./user.interface"

export interface IPost {
    id: number,
    author: IUser,
    content: string,
    date: Date,
    img: string,
    tagged_riders: IRider[]
}


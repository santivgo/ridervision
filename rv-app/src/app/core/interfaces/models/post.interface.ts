import { IRider } from "./rider.interface"
import { IUser } from "./user.interface"

export interface IPost {
    id: number,
    content: string,
    date: Date,
    img: string,
    author: string,
    tagged_riders: IRider[]
}

export interface IRawPost {
    content: string,
    img: string | null,
    tagged_riders: IRider[]
}
import { IPost } from "./post.interface"
import { IUser } from "./user.interface"

export interface IComment{
    id: number,
    comment: string, 
    date: Date,
    // author: IUser,
    username: string // ISSO É PRA ESTAR DEPRECADO!
    post: IPost
}

export type ICommentPreview = Omit<IComment, 'id' | 'author' | 'date' | 'post' >


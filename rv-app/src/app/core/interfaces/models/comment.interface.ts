import { IPost } from "./post.interface"
import { IUser } from "./user.interface"

export interface IComment{
    id: number,
    content: string, 
    author: string,
    author_username: string,
    author_img: string,
    date: Date,
    post: IPost
}

export type ICommentPreview = Omit<IComment, 'id' | 'author' | 'date' | 'post' >
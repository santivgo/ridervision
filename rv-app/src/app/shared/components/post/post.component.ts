import { Component, Input } from '@angular/core';
import { IUser } from '../../../core/interfaces/models/user.interface';
import { IPost } from '../../../core/interfaces/models/post.interface';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.sass'
})
export class PostComponent {
  @Input({required: true})
  user: IUser = {} as IUser
  post: IPost = {} as IPost
}

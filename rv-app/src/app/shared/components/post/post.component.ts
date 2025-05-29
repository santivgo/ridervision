import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../tag/tag.component';
import { IUser } from '../../../core/interfaces/models/user.interface';
import { IPost } from '../../../core/interfaces/models/post.interface';
import { PostCommentComponent } from './post-comment/post-comment.component';

@Component({
  selector: 'app-post',
  imports: [TagComponent, CommonModule, PostCommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.sass'
})
export class PostComponent {
  @Input({required: true})
  user: IUser = {} as IUser
  post: IPost = {} as IPost

  exibirComments: boolean = false

  toggleComments(): void {
    this.exibirComments = !this.exibirComments
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../tag/tag.component';
import { IPost } from '../../../core/interfaces/models/post.interface';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { UsersService } from '../../../core/services/users.service';
import { IUser } from '../../../core/interfaces/models/user.interface';
import { CommentService } from '../../../core/services/comment.service';
import { IComment } from '../../../core/interfaces/models/comment.interface';

@Component({
  selector: 'app-post',
  imports: [TagComponent, CommonModule, PostCommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.sass'
})
export class PostComponent implements OnInit{
  @Input({required: true})
  post = {} as IPost;
  user: IUser = {} as IUser;
  comments: IComment[] = [];

  exibirComments: boolean = false

  constructor(
    private userService: UsersService,
    private commentsService: CommentService,
  ) {}

  toggleComments(): void {
    this.exibirComments = !this.exibirComments
  }

  ngOnInit(): void {
    console.log("post",this.post.author)
    this.loadUser();
    this.loadComments();
  }

  loadUser(): void {
    this.userService.getUser(Number(this.post.author))
      .subscribe((data) => {
        this.user = data;
        console.log("user",data)
      });
  }

  loadComments(): void {    
    this.commentsService.getCommentsByUser(Number(this.user.id))
      .subscribe((data) => {
        this.comments = data;
        console.log("coment",data)
      });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../../../../core/interfaces/models/comment.interface';
import { UsersService } from '../../../../core/services/users.service';
import { IUser } from '../../../../core/interfaces/models/user.interface';

@Component({
  selector: 'app-post-comment',
  imports: [],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.sass'
})
export class PostCommentComponent implements OnInit {
  @Input() comment: IComment = {} as IComment;
  user: IUser = {} as IUser;

  constructor(
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadUser()
  }

  private loadUser(): void {
    this.userService.getUserById(Number(this.comment.author))
      .subscribe((data) => {
        this.user = data;
      });
  }
}

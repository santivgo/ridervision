import { Component, Input } from '@angular/core';
import {IComment } from '../../../core/interfaces/models/comment.interface';
import { IUser } from '../../../core/interfaces/models/user.interface';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass'
})
export class CommentComponent {
  @Input({required: true, alias: 'comment'})
  comment: IComment = {} as IComment;
  user: IUser = {} as IUser;

  exibirComments: boolean = false

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

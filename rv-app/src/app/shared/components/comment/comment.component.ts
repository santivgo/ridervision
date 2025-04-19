import { Component, Input } from '@angular/core';
import { IComment } from '../../../core/interfaces/comment';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass'
})
export class CommentComponent {

  @Input({required: true, alias: 'comment'})
  comment: IComment = {} as IComment;
}

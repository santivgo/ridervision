import { Component, Input } from '@angular/core';
import {ICommentPreview } from '../../../core/interfaces/models/comment.interface';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass'
})
export class CommentComponent {

  @Input({required: true, alias: 'comment'})
  comment: ICommentPreview = {} as ICommentPreview;
}

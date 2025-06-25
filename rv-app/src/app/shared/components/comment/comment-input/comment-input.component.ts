import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../../../../core/services/comment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  imports: [FormsModule],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.sass'
})
export class CommentInputComponent {
  @Input() postId!: number;
  @Output() commentSent = new EventEmitter<void>();
  commentString = '';

  constructor(private commentService: CommentService) {}

  postComment(): void {
    if (this.commentString.trim() && this.postId) {
      const token = localStorage.getItem('token');
      if (!token) return;
      const newComment = {
        post: this.postId,
        content: this.commentString
      };
      this.commentService.createComment(newComment, token).subscribe(() => {
        this.commentString = '';
        this.commentSent.emit();
      });
    }
  }
}

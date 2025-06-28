import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommentService } from '../../../../core/services/comment.service';
import { UsersService } from '../../../../core/services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  imports: [FormsModule],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.sass'
})
export class CommentInputComponent implements OnInit {
  @Input() postId!: number;
  @Output() commentSent = new EventEmitter<void>();
  commentString = '';
  userId: number | null = null;

  constructor(
    private commentService: CommentService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe({
      next: (user) => {
        this.userId = Number(user.id);
      },
      error: () => {
        this.userId = null;
      }
    });
  }

  postComment(event?: Event): void {
    if (event) {
      (event as KeyboardEvent).preventDefault();
    }
    if (this.commentString.trim() && this.postId && this.userId) {
      const hoej = new Date();
      const hojeStr = hoej.toISOString().split('T')[0];
      const newComment = {
        post: this.postId,
        content: this.commentString,
        date: hojeStr,
        author: this.userId
      };
      this.commentService.createComment(newComment).subscribe(() => {
        this.commentString = '';
        this.commentSent.emit();
      });
    }
  }
}

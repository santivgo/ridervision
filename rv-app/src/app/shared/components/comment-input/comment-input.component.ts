import { Component } from '@angular/core';
import { CommentService } from '../comment/comment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  imports: [FormsModule],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.sass'
})
export class CommentInputComponent {
  commentString = ''

  constructor(private commentService: CommentService) {}

  postComment(): void{
    if(this.commentString.trim()) {
      const newComentario = {
        username: 'Nun tem',
        comment: this.commentString
      };

      this.commentService.postComment(newComentario).subscribe(() => {
        console.log('mando');
        this.commentString = ''; //limpa imput
      })
    }
  }

}

import { Component } from '@angular/core';
import { DividerHorizontalComponent } from '../../shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CommentComponent } from '../../shared/components/comment/comment.component';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-profile',
  imports: [DividerHorizontalComponent, CommentComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent {
    comments: any[] = [
      {
        "id": 1,
        "username": "User1",
        "comment": "Este é o primeiro comentário."
      },
      {
        "id": 2,
        "username": "User2",
        "comment": "Este é o segundo comentário."
      },
      {
        "id": 3,
        "username": "User3",
        "comment": "Mais um comentário para testar."
      }
    ];

}

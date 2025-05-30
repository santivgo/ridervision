import { Component } from '@angular/core';

@Component({
  selector: 'app-post-comment',
  imports: [],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.sass'
})
export class PostCommentComponent {
  // não vou tipar nem nada assim por enqunt, só pra n ter risco de dar bo tiver pegando dados reais
  imgSrc = 'assets/o_magal_mock.png'
  username = '@magal'
  date = '14-09-2025'
  comment = 'ai meu deus que delciia kkkkk'
}

import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommentComponent } from './shared/components/comment/comment.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CommentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
}

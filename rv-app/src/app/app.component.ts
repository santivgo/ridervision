import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommentComponent } from './shared/components/comment/comment.component';
import { CardRiderComponent } from './shared/components/main-cards/card-rider/card-rider.component';
import { ShowcaseComponent } from './shared/components/showcase/showcase.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CommentComponent, CardRiderComponent, ShowcaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
}

import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommentComponent } from './shared/components/comment/comment.component';
import { CardRiderComponent } from './shared/components/main-cards/card-rider/card-rider.component';
import { ShowcaseComponent } from './shared/components/showcase/showcase-component/showcase.component';
import { HorizontalSepComponent } from './shared/components/dividers/horizontal-sep/horizontal-sep.component';
import { DividerHorizontalComponent } from './shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CardHeaderDirective } from './core/directives/card-header.directive';
import { CardContentDirective } from './core/directives/card-content.directive';
import { DividerHorizontalGradientComponent } from './shared/components/dividers/divider-horizontal-gradient/divider-horizontal-gradient.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {

}

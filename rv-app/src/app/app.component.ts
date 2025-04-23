import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommentComponent } from './shared/components/comment/comment.component';
import { CardRiderComponent } from './shared/components/main-cards/card-rider/card-rider.component';
import { ShowcaseComponent } from './shared/components/showcase/showcase-component/showcase.component';
import { HorizontalSepComponent } from './shared/components/dividers/horizontal-sep/horizontal-sep.component';
import { DividerHorizontalComponent } from './shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CardHeaderDirective } from './core/card-header.directive';
import { CardContentDirective } from './core/card-content.directive';
import { DividerHorizontalGradientComponent } from './shared/components/dividers/divider-horizontal-gradient/divider-horizontal-gradient.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CommentComponent, CardRiderComponent, ShowcaseComponent, HorizontalSepComponent, DividerHorizontalComponent, CardHeaderDirective, CardContentDirective, DividerHorizontalGradientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  imgSrc: string = '/assets/MiBRrBm.png';
  riderName: string = 'MAJEDE';
  riderDescription: string = 'from kamen rider gotchard';
  textAreaTitle: string = 'BASE FORM';
  textAreaContent: string = `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`;
}

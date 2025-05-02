import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShowcaseCardBrandComponent } from './showcase-card-brand/showcase-card-brand.component';

@Component({
  selector: 'app-showcase-card',
  imports: [CommonModule, ShowcaseCardBrandComponent],
  templateUrl: './showcase-card.component.html',
  styleUrl: './showcase-card.component.sass'
})
export class ShowcaseCardComponent {

}

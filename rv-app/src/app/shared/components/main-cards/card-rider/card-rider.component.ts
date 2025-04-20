import { Component } from '@angular/core';
import { DividerHorizontalComponent } from '../../divider-horizontal/divider-horizontal.component';

@Component({
  selector: 'app-card-rider',
  imports: [DividerHorizontalComponent],
  templateUrl: './card-rider.component.html',
  styleUrl: './card-rider.component.sass'
})
export class CardRiderComponent {
  imgSrc: string = '/assets/MiBRrBm.png';
  riderName: string = 'MAJEDE';
  riderDescription: string = 'from kamen rider gotchard';
  textAreaTitle: string = 'BASE FORM';
  textAreaContent: string = `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`;
}

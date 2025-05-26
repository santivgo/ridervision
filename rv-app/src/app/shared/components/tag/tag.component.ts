import { Component, Input, OnInit } from '@angular/core';
import { IRider } from '../../../core/interfaces/models/rider.interface';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.sass']
})
// por enquanto vai ficar só assim, vo implementar no django as coisas uqe fazem isso ficar 100%
export class TagComponent {
  @Input() tagged_rider: IRider = {} as IRider;
}
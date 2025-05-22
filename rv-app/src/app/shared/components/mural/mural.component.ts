import { Component, Input } from '@angular/core';
import { IShow } from '../../../core/interfaces/models/show.interface';

@Component({
  selector: 'app-mural',
  imports: [],
  templateUrl: './mural.component.html',
  styleUrl: './mural.component.sass'
})
export class MuralComponent {
  @Input({required: true})
  show: IShow = {} as IShow
}

import { Component, Input } from '@angular/core';
import { IShow } from '../../../core/interfaces/models/show.interface';
import { ShowcaseCardImgDirective } from '../../../core/directives/card-poster.directive';

@Component({
  selector: 'app-mural',
  imports: [ShowcaseCardImgDirective],
  templateUrl: './mural.component.html',
  styleUrl: './mural.component.sass'
})
export class MuralComponent {
  @Input({required: true})
  show: IShow = {} as IShow
}

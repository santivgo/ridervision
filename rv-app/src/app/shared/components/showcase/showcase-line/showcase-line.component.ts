import { Component, Input } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { IRider } from '../../../../core/interfaces/rider';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { ShowcaseCardComponent } from '../showcase-card/showcase-card.component';
import { ShowcaseCardHeaderDirective } from '../showcase-card/directives/showcase-card-header.directive';
import { ShowcaseCardImgDirective } from '../showcase-card/directives/showcase-card-img.directive';

@Component({
  selector: 'app-showcase-line',
  imports: [ButtonIconComponent, ShowcaseCardComponent, ShowcaseCardHeaderDirective, ShowcaseCardImgDirective, NgbCollapseModule, CommonModule],
  templateUrl: './showcase-line.component.html',
  styleUrl: './showcase-line.component.sass'
})
export class ShowcaseLineComponent {
  @Input({'required': true}) riders: IRider[] = [];
  riderCollapse: IRider = {} as IRider;
  isCollapsed: boolean = true;

  changeRiderCollapse(rider: IRider){
    this.riderCollapse = rider;
  }


}

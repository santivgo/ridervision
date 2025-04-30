import { Component, Input } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { IRider } from '../../../../core/interfaces/rider';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from './button-icon/button-icon.component';

@Component({
  selector: 'app-showcase-line',
  imports: [NgbCollapseModule, ButtonIconComponent, CommonModule],
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

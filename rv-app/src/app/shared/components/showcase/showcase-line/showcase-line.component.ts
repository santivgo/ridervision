import { Component, Input, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { IRider } from '../../../../core/interfaces/rider';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { ShowcaseCardComponent } from '../showcase-card/showcase-card.component';
import { ShowcaseCardHeaderDirective } from '../showcase-card/directives/showcase-card-header.directive';
import { ShowcaseCardImgDirective } from '../showcase-card/directives/showcase-card-img.directive';
import { ShowcaseCardContentDirective } from '../showcase-card/directives/showcase-card-content.directive';
import { IShow } from '../../../../core/interfaces/show';
import { ShortNamePipe } from '../../../../core/pipes/short-name.pipe';
import { AgePipe } from '../../../../core/pipes/age.pipe';
import { EraPipe } from '../../../../core/pipes/era.pipe';

@Component({
  selector: 'app-showcase-line',
  imports: [ButtonIconComponent, ShortNamePipe, AgePipe, ShowcaseCardComponent, ShowcaseCardContentDirective, ShowcaseCardHeaderDirective, ShowcaseCardImgDirective, NgbCollapseModule, CommonModule, EraPipe],
  templateUrl: './showcase-line.component.html',
  styleUrl: './showcase-line.component.sass'
})
export class ShowcaseLineComponent {
  @Input({'required': true}) riders: IShow[] = [];
  riderCollapse: IShow = {} as IShow;
  isCollapsed: boolean = true;
  

  changeRiderCollapse(rider: IShow){
    this.riderCollapse = rider;
  }


}

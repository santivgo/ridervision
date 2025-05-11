import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { IShow } from '../../core/interfaces/show';
import { CommentService } from '../../core/services/comment.service';
import { SeriesService } from '../../core/services/series.service';

import { DividerHorizontalComponent } from '../../shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CommentComponent } from '../../shared/components/comment/comment.component';
import { CardHeaderDirective } from '../../core/directives/card-header.directive';
import { ButtonIconComponent } from '../../shared/components/showcase/showcase-line/button-icon/button-icon.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
  imports: [
    CommonModule,
    NgbCollapseModule,
    DividerHorizontalComponent,
    CommentComponent,
    CardHeaderDirective,
    ButtonIconComponent,
  ]
})
export class ProfileComponent {
  @Input({'alias': 'collapseRef', required: true}) collapse!: NgbCollapse;
  @Input() riders: IShow[] = [];

  imgSrc: string = '';
  seriesName: string = '';
  isCollapsed: boolean = true;
  riderCollapse: IShow = {} as IShow;
  comments: any[] = [];

  constructor(
    private commentsService: CommentService,
    private seriesService: SeriesService
  ) {}

  ngOnInit(): void {
    this.loadComments();
    this.loadSeries();
  }

  private loadComments(): void {
    this.commentsService.getComments().subscribe((data) => {
      this.comments = data;
    });
  }

  private loadSeries(): void {
    this.seriesService.getShows().subscribe((data) => {
      this.riders = data;
      this.setRandomRider();
    });
  }

  private setRandomRider(): void {
    if (this.riders.length) {
      const index = Math.floor(Math.random() * this.riders.length);
      this.selectRider(this.riders[index]);
      this.isCollapsed = false;
    }
  }

  selectRider(rider: IShow): void {
    this.riderCollapse = rider;
    this.imgSrc = rider.imgs.rider_img_xl; // Temporariamente usando essa imagem enquanto o banco não está com as imagens PNG de poses :v
    this.seriesName = rider.name.replace('Kamen Rider ', '').replace(' (TV Show)', '');
  }


}

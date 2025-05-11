import { Component, Input } from '@angular/core';
import { DividerHorizontalComponent } from '../../shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CommentComponent } from '../../shared/components/comment/comment.component';
import { CardHeaderDirective } from '../../core/directives/card-header.directive';
import { ButtonIconComponent } from '../../shared/components/showcase/showcase-line/button-icon/button-icon.component';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from '../../core/services/comment.service';
import { IShow } from '../../core/interfaces/show';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { SeriesService } from '../../core/services/series.service';

@Component({
  selector: 'app-profile',
  imports: [DividerHorizontalComponent, CommentComponent, CommonModule, CardHeaderDirective, ButtonIconComponent, NgbCollapseModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent {
    @Input({'alias': 'collapseRef', required: true}) collapse!: NgbCollapse;
    comments: any[] = [];

    imgSrc: string = '';
    seriesName: string = '';

    @Input({'required': true}) riders: IShow[] = [];
    riderCollapse: IShow = {} as IShow;
    isCollapsed: boolean = true;

    constructor(private commentsService: CommentService, private series: SeriesService) {}

    ngOnInit(): void {
      this.getComments();
      this.getSeries();
    }

    getComments(): void {
      this.commentsService.getComments().subscribe((data) => {
        this.comments = data;
      });
    }

    getSeries(): void {
      this.series.getShows().subscribe((data) => {
        this.riders = data;
        this.selectRandomRider();
      });
    }

    selectRandomRider(): void {
      if (this.riders.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.riders.length);
        this.changeRiderCollapse(this.riders[randomIndex]);
        this.isCollapsed = false;
      }
    }

    changeRiderCollapse(rider: IShow): void {
      this.riderCollapse = rider;
      this.imgSrc = rider.imgs.rider_img_xl; // Temporariamente usando essa imagem enquanto o banco não está com as imagens PNG de poses
      this.seriesName = rider.name.replace('Kamen Rider ', '').replace(' (TV Show)', '');
    }
}
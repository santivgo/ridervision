import { Component, Input } from '@angular/core';
import { DividerHorizontalComponent } from '../../shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CommentComponent } from '../../shared/components/comment/comment.component';
import { CardHeaderDirective } from '../../core/directives/card-header.directive';
import { ButtonIconComponent } from '../../shared/components/showcase/showcase-line/button-icon/button-icon.component';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../core/services/comment.service';
import { IShow } from '../../core/interfaces/show';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { SeriesService } from '../../core/services/series.service';

@Component({
  selector: 'app-profile',
  imports: [DividerHorizontalComponent, CommentComponent, CommonModule, CardHeaderDirective, ButtonIconComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent {
    riderCollapse: IShow = {} as IShow;
    isCollapsed: boolean = true;
    imgSrc: string = '/assets/MiBRrBm.png';
    riderName: string = 'MAJEDE';
    collapse!: NgbCollapse;
    intervalId: any;

    comments: any[] = [];
    @Input({ required: true }) riders: IShow[] = [];

    constructor(private commentsService: CommentService, private series: SeriesService) {}
    

    ngOnInit(): void {
      this.getComments();
      this.getSeries();
    }

    getComments(): void{ // por agora mockado, mas depois usar bd para pegar os comentarios da conta
      this.commentsService.getComments().subscribe((data) => {
        this.comments = data;
      });
    }

    getSeries(): void{
      this.series.getShows().subscribe((data) => {
  
        this.riders = data
  
      });
    }

    changeRiderCollapse(rider: IShow){
      this.riderCollapse = rider;
    }
}

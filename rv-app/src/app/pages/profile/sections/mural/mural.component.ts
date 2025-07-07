import { AfterViewInit, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IShow } from '../../../../core/interfaces/models/show.interface';
import { ShowcaseCardImgDirective } from '../../../../core/directives/card-poster.directive';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { StatsComponent } from '../../../../shared/components/stats/stats.component';
import { FavShowBtnComponent } from "../../../../shared/components/fav-show-btn/fav-show-btn.component";
import { SeriesService } from '../../../../core/services/series.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../core/services/users.service';
import { IUser } from '../../../../core/interfaces/models/user.interface';
import { IReview } from '../../../../core/interfaces/models/review.interface';
import { GreetingsComponent } from "./greetings/greetings.component";
import { ReviewService } from '../../../../core/services/review.service';
import { FavRiderBtnComponent } from "../../../../shared/components/fav-rider-btn/fav-rider-btn.component";
import { DividerHorizontalComponent } from "../../../../shared/components/dividers/divider-horizontal/divider-horizontal.component";

@Component({
  selector: 'app-mural',
  imports: [FavShowBtnComponent, CommonModule, GreetingsComponent, FavRiderBtnComponent, DividerHorizontalComponent],
  templateUrl: './mural.component.html',
  styleUrl: './mural.component.sass'
})
export class MuralComponent implements AfterViewInit {
  actualReview: IReview = {} as IReview;
  reviewList: IReview[] = []
  
  constructor(
    private readonly _seriesService: SeriesService,
    private readonly _userService: UsersService,
    private readonly _reviewService: ReviewService
  ) {}
  

  ngAfterViewInit(): void {

    this._userService.getCurrentUser().subscribe((user: IUser)=> {
      this._reviewService.getReviewsByUser(user.id).pipe(take(1)).subscribe((reviewList) => {
      this.reviewList = reviewList
      this.actualReview = this.reviewList[0]
  
      })
    });

  }






  protected changeShow(event: IReview): void{
    this.actualReview = event 
  }


}

import { Component, Input, OnInit } from '@angular/core';
import { IShow } from '../../../../core/interfaces/models/show.interface';
import { ShowcaseCardImgDirective } from '../../../../core/directives/card-poster.directive';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { StatsComponent } from '../../../../shared/components/stats/stats.component';
import { FavShowBtnComponent } from "../../../../shared/components/fav-show-btn/fav-show-btn.component";
import { SeriesService } from '../../../../core/services/series.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mural',
  imports: [FavShowBtnComponent, CommonModule],
  templateUrl: './mural.component.html',
  styleUrl: './mural.component.sass'
})
export class MuralComponent implements OnInit {
  actualShow: IShow = {} as IShow;

  show: IShow = {} as IShow
  favRiders: IShow[] = [];
  
  constructor(
      private seriesService: SeriesService) {}
  
    ngOnInit(): void {
      this.loadSeries();
    }


   private setFavList(riderList: IShow[]): IShow[]{

    const fav_riders: IShow[] = []
    if (riderList.length > 4){
        for (let index = 0; index < 4; index++) {
          fav_riders.push(this.getRandomShow(riderList))
      }
      this.actualShow = fav_riders[0]
    }
    return fav_riders

  }

  private getRandomShow(riderList: IShow[]): IShow {
    if (riderList.length) {
      const index = Math.floor(Math.random() * riderList.length);
      return riderList[index];
    }
    return {} as IShow
  }


  private loadSeries(): void {
    this.seriesService.getShows().pipe(take(1)).subscribe((data) => {
      this.favRiders = this.setFavList(data)

    });

  }

  protected changeShow(event: IShow): void{
    this.actualShow = event 
  }


}

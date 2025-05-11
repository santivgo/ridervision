import { Component, OnDestroy, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
import { ShowcaseLineComponent } from '../showcase-line/showcase-line.component';
import { IShow } from '../../../../core/interfaces/show';
import { SeriesService } from '../../../../core/services/series.service';
import { Observable, of, Subscribable, Subscription } from 'rxjs';
@Component({
  selector: 'app-showcase',
  imports: [ShowcaseLineComponent, CommonModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.sass'
})
export class ShowcaseComponent implements OnInit, OnDestroy{

  constructor(private series: SeriesService) {}
  
  riderListRef: Subscription | undefined;
  lineRidersList: IShow[][] = []

  ngOnInit(): void {
    this.getSeries()

  }

  getSeries(): void{
    this.riderListRef = this.series.getShows().subscribe((data) => {

      const riderList: IShow[] = data.reverse();

      const lineSize = 5;
      for (let index = 0; index < riderList.length; index+=lineSize) {
        this.lineRidersList.push(riderList.slice(index, index+lineSize))
      }

    });
  }

  ngOnDestroy(): void {
    this.riderListRef && this.riderListRef.unsubscribe()
    
  }
}

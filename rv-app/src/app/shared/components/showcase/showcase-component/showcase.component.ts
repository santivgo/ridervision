import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
import { ShowcaseLineComponent } from '../showcase-line/showcase-line.component';
import { IShow } from '../../../../core/interfaces/show';
import { SeriesService } from '../../../../core/services/series.service';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-showcase',
  imports: [ShowcaseLineComponent, CommonModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.sass'
})
export class ShowcaseComponent implements OnInit{

  constructor(private series: SeriesService) {}

  riderList$: Observable<IShow[]> = new Observable<IShow[]>
  lineRidersList$: Observable<IShow[][]> = new Observable<IShow[][]>

  ngOnInit(): void {
    this.getSeries()

  }

  getSeries(): void{
    this.series.getShows().subscribe((data) => {


      const riderList: IShow[] = data.reverse();
      const lineRidersList: IShow[][] = []

      const lineSize = 5;
      for (let index = 0; index < riderList.length; index+=lineSize) {
        lineRidersList.push(riderList.slice(index, index+lineSize))
      }
      this.lineRidersList$ = of(lineRidersList)
      this.riderList$ = of(riderList)

    });
  }
}

import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
import { ShowcaseLineComponent } from '../showcase-line/showcase-line.component';
import { IShow } from '../../../../core/interfaces/show';
import { SeriesService } from '../../../../core/services/series.service';
@Component({
  selector: 'app-showcase',
  imports: [ShowcaseLineComponent, CommonModule],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.sass'
})
export class ShowcaseComponent implements OnInit{
  riderList: IShow[] = [ 
  ]

  constructor(private series: SeriesService) {}
  

  lineRidersList: IShow[][] = []

  ngOnInit(): void {
    this.getSeries()


  }

  getSeries(): void{
    this.series.getShows().subscribe((data) => {

      this.riderList = data.reverse();
      const lineSize = 5;

      for (let index = 0; index < this.riderList.length; index+=lineSize) {
        this.lineRidersList.push(this.riderList.slice(index, index+lineSize))
      }

    });
  }
}

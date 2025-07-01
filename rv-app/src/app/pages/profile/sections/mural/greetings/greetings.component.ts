import { Component, OnInit } from '@angular/core';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { IShow } from '../../../../../core/interfaces/models/show.interface';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../../../../../core/services/series.service';
import { ShortNamePipe } from '../../../../../core/pipes/short-name.pipe';
import { IRider } from '../../../../../core/interfaces/models/rider.interface';
import { RiderService } from '../../../../../core/services/rider.service';

@Component({
  selector: 'app-greetings',
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule, ShortNamePipe],
  templateUrl: './greetings.component.html',
  styleUrl: './greetings.component.sass'
})
export class GreetingsComponent implements OnInit{
  shows: IShow[] = [];
  selectedShow: IShow | undefined;
  riderListFromShow: IRider[] | undefined;
  responsiveOptions: any[] | undefined;

  constructor(
    private readonly _seriesService: SeriesService,
    private readonly _riderService: RiderService,

  ){}

  ngOnInit(): void {
      this._seriesService.getShows().subscribe((showList: IShow[])=>this.shows = showList)
      this.responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ]
      console.log(this.shows)
    }
  
  getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'teste';

        }
    }

  changeSelectedShow(show: IShow){
    if(this.selectedShow===undefined){
      this.selectedShow = show;
      this._riderService.getRidersByShow(this.selectedShow.id).subscribe((riderList) => this.riderListFromShow = riderList)
    }
  }
    

  }



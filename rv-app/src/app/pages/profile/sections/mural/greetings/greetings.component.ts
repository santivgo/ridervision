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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../../../core/interfaces/models/user.interface';
import { UsersService } from '../../../../../core/services/users.service';

@Component({
  selector: 'app-greetings',
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule, ShortNamePipe, ReactiveFormsModule],
  templateUrl: './greetings.component.html',
  styleUrl: './greetings.component.sass'
})
export class GreetingsComponent implements OnInit{
  shows: IShow[] = [];
  selectedShow: IShow | undefined;
  riderListFromShow: IRider[] | undefined;
  responsiveOptions: any[] | undefined;
  riderListSelected: IRider[] = []
  reviewForm!: FormGroup;

  constructor(
    private readonly _seriesService: SeriesService,
    private readonly _riderService: RiderService,
    private readonly _userService: UsersService

  ){}

  ngOnInit(): void {
    this._seriesService.getShows().subscribe((showList: IShow[])=>this.shows = showList)
    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
      { breakpoint: '768px', numVisible: 2, numScroll: 1 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ]
    this.reviewForm = new FormGroup({
          review: new FormControl(''),
        },)
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
  
  addRider(rider: IRider){

    if (this.riderListSelected.includes(rider)){
      this.riderListSelected = this.riderListSelected.filter(item => item ! = rider)
    }else{
      console.log(this.riderListSelected.length)
      if(this.riderListSelected.length <= 2){
        this.riderListSelected.push(rider)
      }
    }

  }

  submit(){
    const {review} = this.reviewForm.value
    let user: IUser = {} as IUser
    this._userService.getCurrentUser().subscribe((currentUser)=> user = currentUser);
    // this._usersService.loginUser({username, password}).subscribe({
    // next: (response) => {
    //   this._usersService.saveTokens(response);
    //   this.router.navigate(['/perfil']);
    // },
    // error: (error) => {
    //   console.error('Erro no login:', error);
    // },})

  }

  changeSelectedShow(show: IShow){
    if(this.riderListSelected){ // && this.form.dirty...
      this.selectedShow = show;
      this._riderService.getRidersByShow(this.selectedShow.id).subscribe((riderList) => this.riderListFromShow = riderList)
    }    
  }
    

  }



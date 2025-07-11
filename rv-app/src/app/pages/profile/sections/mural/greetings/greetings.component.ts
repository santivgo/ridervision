import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { IShow } from '../../../../../core/interfaces/models/show.interface';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../../../../../core/services/series.service';
import { ShortNamePipe } from '../../../../../core/pipes/short-name.pipe';
import { IRider } from '../../../../../core/interfaces/models/rider.interface';
import { RiderService } from '../../../../../core/services/rider.service';
import { FormControl, FormGroup, isFormRecord, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../../../core/interfaces/models/user.interface';
import { UsersService } from '../../../../../core/services/users.service';
import { IReview } from '../../../../../core/interfaces/models/review.interface';
import { ReviewService } from '../../../../../core/services/review.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-greetings',
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule, ShortNamePipe, ReactiveFormsModule, ToastModule],
  templateUrl: './greetings.component.html',
  styleUrl: './greetings.component.sass'
})
export class GreetingsComponent implements OnInit{
  
  shows: IShow[] = [];
  selectedShow: IShow | undefined;
  riderListFromShow: IRider[] | undefined;
  responsiveOptions: any[] | undefined;
  riderListSelected: IRider[] = []
  reviewsList: IReview[] = []
  reviewForm!: FormGroup;
  currentUser: IUser = {} as IUser


  constructor(
    private readonly _seriesService: SeriesService,
    private readonly _riderService: RiderService,
    private readonly _userService: UsersService,
    private readonly _reviewService: ReviewService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {

    this._userService.getCurrentUser().subscribe({
    next: (currentUser) => {
      this.currentUser = currentUser;
      this._reviewService.getReviewsByUser(this.currentUser.id).subscribe((userReviewList)=>{
      for(const review of userReviewList){
        this.reviewsList.push(review)
      }
      })
    },
    error: (error) => {
      console.log(error)
    }});

   

    this._seriesService.getShows().subscribe((showList: IShow[])=> {
      this.shows = showList
  })

   this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
      { breakpoint: '768px', numVisible: 2, numScroll: 1 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ]

    this.reviewForm = new FormGroup({
          review: new FormControl(''),
        },)
    }
  
  containsShow(show: IShow): IReview {
    for (const review of this.reviewsList){

      if (review.show.id === show.id){
        return review
      }

    }
      return {} as IReview

    }

  containsRider(rider: IRider): IRider {

    for (const riderSelected of this.riderListSelected){
        if (riderSelected.id === rider.id){
          return riderSelected
        }
    }
    return {} as IRider

    }
  
  addRider(rider: IRider){

    if (this.riderListSelected.includes(rider)){
      this.riderListSelected = this.riderListSelected.filter(item => item !== rider)
    }else{
      if(this.riderListSelected.length <= 2){
        this.riderListSelected.push(rider)
      }
    }
    console.log(this.riderListSelected)


  }


  submit(){
    const reviewText = this.reviewForm.value.review

    const review: IReview = {
      show: this.selectedShow!,
      user: this.currentUser,
      fav_riders: this.riderListSelected,
      show_review: reviewText
  }

    if (this.reviewsList.some((reviewNaLista)=> reviewNaLista.show.id == review.show.id)){
      const index = this.reviewsList.findIndex(reviewNaLista => reviewNaLista.show.id == review.show.id)
      this.reviewsList[index] = review
      this.messageService.add({ severity: 'info', summary: 'Série existente', detail: 'Review Atualizada!', life: 3000 });


    }else{
      this.reviewsList.push(review)    
      this.messageService.add({ severity: 'success', summary: 'Série adicionada!', detail: 'Sua série favorita foi adicionada ao review', life: 3000 });
      this.reviewForm.reset()

  
    }
    this.riderListSelected = []
    
    }

  
    
  saveReviews(){
    for (const review of this.reviewsList){
      review.user = this.currentUser
      this._reviewService.submitReview(review).subscribe({
    next: (response) => {
      console.log('enviada com sucesso')
      console.log(review)
      this.messageService.add({ severity: 'success', summary: `Review: ${review.show.name} `, detail: 'Seu review foi enviado com sucesso!', life: 3000 });
      setTimeout(()=>{
      window.location.reload();

      }, 1000)
    },
    error: (error) => {
      console.log('bugada com sucesso')
      console.log(review)

      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: error, life: 3000 });
    }
  });
    }
  }

  changeSelectedShow(show: IShow){
    const review: IReview = this.containsShow(show)
    this.selectedShow = show;

    this._riderService.getRidersByShow(this.selectedShow.id).subscribe((riderList) => this.riderListFromShow = riderList)
    if(!(this.containsShow(show).show)){ 
      this.riderListSelected = [];
      this.reviewForm.patchValue({review: review.show_review}) 

    }else{
      this.reviewForm.patchValue({review: review.show_review}) 
      this.riderListSelected = review.fav_riders
    
    }
    

  }
}



import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShow } from '../../../core/interfaces/models/show.interface';
import { IReview } from '../../../core/interfaces/models/review.interface';

@Component({
  selector: 'app-fav-show-btn',
  imports: [],
  templateUrl: './fav-show-btn.component.html',
  styleUrl: './fav-show-btn.component.sass'
})
export class FavShowBtnComponent {
  @Input({required: true})
  review: IReview = {} as IReview;

  @Output() riderEmitter: EventEmitter<IReview> = new EventEmitter<IReview>();

  protected emitRider(): void{
    this.riderEmitter.emit(this.review)
  }

}

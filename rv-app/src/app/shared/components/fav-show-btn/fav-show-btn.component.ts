import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShow } from '../../../core/interfaces/models/show.interface';

@Component({
  selector: 'app-fav-show-btn',
  imports: [],
  templateUrl: './fav-show-btn.component.html',
  styleUrl: './fav-show-btn.component.sass'
})
export class FavShowBtnComponent {
  @Input({required: true})
  rider: IShow = {} as IShow;

  @Output() riderEmitter: EventEmitter<IShow> = new EventEmitter<IShow>();

  protected emitRider(): void{
    this.riderEmitter.emit(this.rider)
  }

}

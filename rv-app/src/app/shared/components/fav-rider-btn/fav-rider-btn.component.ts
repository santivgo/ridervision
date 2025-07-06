import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRider } from '../../../core/interfaces/models/rider.interface';

@Component({
  selector: 'app-fav-rider-btn',
  imports: [],
  templateUrl: './fav-rider-btn.component.html',
  styleUrl: './fav-rider-btn.component.sass'
})
export class FavRiderBtnComponent {
  @Input({required: true})
  rider: IRider = {} as IRider;

  @Output() riderEmitter: EventEmitter<IRider> = new EventEmitter<IRider>();

  protected emitRider(): void{
    this.riderEmitter.emit(this.rider)
  }

}

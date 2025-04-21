import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IRider } from '../../../../core/interfaces/rider';

@Component({
  selector: 'app-button-icon',
  imports: [],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.sass'
})
export class ButtonIconComponent {
  @ViewChild('textButton')
  textBtnEl!: ElementRef<HTMLParagraphElement>;
  
  @Input({'required':true})
  rider: IRider = {} as IRider

  textShow(){
    this.textBtnEl.nativeElement.classList.add("active")

  }
  textHide(){
    this.textBtnEl.nativeElement.classList.remove("active")
  }
}

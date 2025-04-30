import { Component, ElementRef, input, Input, ViewChild } from '@angular/core';
import { IRider } from '../../../../core/interfaces/rider';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-button-icon',
  imports: [NgbCollapseModule],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.sass'
})
export class ButtonIconComponent {

  @Input({required: true}) isCollapsed: boolean = false;
  @Input({'alias': 'collapseRef', required: true}) collapse!: NgbCollapse

  @ViewChild('textButton') textBtnEl!: ElementRef<HTMLParagraphElement>;
  
  @Input({'required':true}) rider: IRider = {} as IRider

  textShow(){
    this.textBtnEl.nativeElement.classList.add("active")

  }
  textHide(){
    this.textBtnEl.nativeElement.classList.remove("active")
  }
}

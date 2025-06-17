import { Component, ElementRef, EventEmitter, input, Input, Output, ViewChild } from '@angular/core';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ShortNamePipe } from '../../../../../core/pipes/short-name.pipe';
import { IShow } from '../../../../../core/interfaces/models/show.interface';

@Component({
  selector: 'app-button-icon',
  imports: [NgbCollapseModule, ShortNamePipe],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.sass'
})
export class ButtonIconComponent {

  @Input({required: true}) isCollapsed: boolean = false;
  @Input({'alias': 'collapseRef', required: true}) collapse!: NgbCollapse
  @Output() em = new EventEmitter<IShow>();
  @ViewChild('textButton') textBtnEl!: ElementRef<HTMLParagraphElement>;
  @Input({'required':true}) rider: IShow = {} as IShow
  textShow = (()=> this.textBtnEl.nativeElement.classList.add("active"))
  textHide = (() => this.textBtnEl.nativeElement.classList.remove("active"))



  emitRider(){
    this.em.emit(this.rider)
  }
}

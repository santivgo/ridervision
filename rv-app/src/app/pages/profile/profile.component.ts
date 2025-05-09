import { Component, Input } from '@angular/core';
import { DividerHorizontalComponent } from '../../shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CommentComponent } from '../../shared/components/comment/comment.component';
import { CardHeaderDirective } from '../../core/directives/card-header.directive';
import { ButtonIconComponent } from '../../shared/components/showcase/showcase-line/button-icon/button-icon.component';
import { CommonModule } from '@angular/common'
import { IShow } from '../../core/interfaces/show';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  imports: [DividerHorizontalComponent, CommentComponent, CommonModule, CardHeaderDirective, ButtonIconComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent {
    @Input({ required: true }) riders: IShow[] = [
      {
        id: "0",
        name: "Kamen Rider Kuuga (TV Show)",
        year: 2001,
        synopsis: "Long ago, the Gurongi Tribe terrorized the Rinto...",
        imgs: {
          rider_img_xl: "https://static.wikia.nocookie.net/kamenrider/images/7/7a/Kuuga_Poster.jpg/",
          rider_img_sm: "assets/mock/kuuga-sm.png"
        }
      },
      {
        id: "1",
        name: "Kamen Rider Agito (TV Show)",
        year: 2002,
        synopsis: "A man named Shoichi Tsugami has lost his memories...",
        imgs: {
          rider_img_xl: "https://static.wikia.nocookie.net/kamenrider/images/d/d0/Agito_Poster.jpg/",
          rider_img_sm: "assets/mock/agito-sm.png"
        }
      },
      {
        id: "0",
        name: "Kamen Rider Kuuga (TV Show)",
        year: 2001,
        synopsis: "Long ago, the Gurongi Tribe terrorized the Rinto...",
        imgs: {
          rider_img_xl: "https://static.wikia.nocookie.net/kamenrider/images/7/7a/Kuuga_Poster.jpg/",
          rider_img_sm: "assets/mock/kuuga-sm.png"
        }
      },
      {
        id: "1",
        name: "Kamen Rider Agito (TV Show)",
        year: 2002,
        synopsis: "A man named Shoichi Tsugami has lost his memories...",
        imgs: {
          rider_img_xl: "https://static.wikia.nocookie.net/kamenrider/images/d/d0/Agito_Poster.jpg/",
          rider_img_sm: "assets/mock/agito-sm.png"
        }
      },
    ];
    riderCollapse: IShow = {} as IShow;
    isCollapsed: boolean = true;
    imgSrc: string = '/assets/MiBRrBm.png';
    riderName: string = 'MAJEDE';
    riderDescription: string = 'from kamen rider gotchard';
    textAreaTitle: string = 'BASE FORM';
    textAreaContent: string = `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`;
    collapse!: NgbCollapse;
    intervalId: any;

    comments: any[] = [
      { id: 1, username: 'User1', comment: 'Este é o primeiro comentário.' },
      { id: 1, username: 'User1', comment: 'Este é o primeiro comentário.' },
      { id: 1, username: 'User1', comment: 'Este é o primeiro comentário.' },
      { id: 1, username: 'User1', comment: 'Este é o primeiro comentário.' },
      { id: 1, username: 'User1', comment: 'Este é o primeiro comentário.' },
      { id: 1, username: 'User1', comment: 'Este é o primeiro comentário.' }
    ];


    changeRiderCollapse(rider: IShow){
      this.riderCollapse = rider;
    }
}

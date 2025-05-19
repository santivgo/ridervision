import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { CommentService } from '../../core/services/comment.service';
import { SeriesService } from '../../core/services/series.service';

import { DividerHorizontalComponent } from '../../shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CommentComponent } from '../../shared/components/comment/comment.component';
import { CardHeaderDirective } from '../../core/directives/card-header.directive';
import { ButtonIconComponent } from '../../shared/components/showcase/showcase-line/button-icon/button-icon.component';
import { ShortNamePipe } from '../../core/pipes/short-name.pipe';
import { UsersService } from '../../core/services/users.service';
import { IShow } from '../../core/interfaces/models/show.interface';
import { IUser } from '../../core/interfaces/models/user.interface';
import { IComment, ICommentPreview } from '../../core/interfaces/models/comment.interface';
import { PostComponent } from "../../shared/components/post/post.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
  imports: [
    CommonModule,
    NgbCollapseModule,
    DividerHorizontalComponent,
    CommentComponent,
    CardHeaderDirective,
    ButtonIconComponent,
    ShortNamePipe,
    PostComponent
]
})
export class ProfileComponent {
  @Input({'alias': 'collapseRef', required: true}) collapse!: NgbCollapse;
  @Input() riders: IShow[] = [];

  selectedSection: string = 'posts'; 


  user: IUser = {} as IUser;
  imgSrc: string = '';
  seriesName: string = '';
  isCollapsed: boolean = true;
  riderCollapse: IShow = {} as IShow;
  comments: ICommentPreview[] = [];

  constructor(
    private commentsService: CommentService,
    private seriesService: SeriesService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadComments();
    this.loadSeries();
    this.getUser();
  }

  
  changeSection(section: string): void{
    this.selectedSection = section
  }
  private loadComments(): void {
    this.commentsService.getComments().subscribe((data) => {
      this.comments = data;
    });
  }

  private loadSeries(): void {
    this.seriesService.getShows().subscribe((data) => {
      this.riders = data;
      this.setRandomRider();
    });
  }


  private getUser(): void {
    const userId = 1;
    this.usersService.getUser(userId).subscribe((data) => {
      console.log(data.img)
      this.user.username = data.username;
      this.user.img = data.img;
    })};

  private setRandomRider(): void {
    if (this.riders.length) {
      const index = Math.floor(Math.random() * this.riders.length);
      this.selectRider(this.riders[index]);
      this.isCollapsed = false;
    }
  }

  selectRider(rider: IShow): void {
    this.riderCollapse = rider;
  }



}

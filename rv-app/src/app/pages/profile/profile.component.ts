import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
import { take } from 'rxjs';
import { FavShowBtnComponent } from "../../shared/components/fav-show-btn/fav-show-btn.component";
import { IRider } from '../../core/interfaces/models/rider.interface';
import { MuralComponent } from "../../shared/components/mural/mural.component";

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
    PostComponent,
    FavShowBtnComponent,
    MuralComponent
]
})
export class ProfileComponent implements OnInit{
  @Input({'alias': 'collapseRef', required: true}) collapse!: NgbCollapse;
  @Input() riders: IShow[] = [];

  selectedSection: string = 'posts'; 
  actualShow: IShow = {} as IShow;

  user: IUser = {} as IUser;
  favRiders: IShow[] = [];
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

  
  protected changeSection(section: string): void{
    this.selectedSection = section
  }
  private loadComments(): void {
    this.commentsService.getComments().subscribe((data) => {
      this.comments = data;
    });
  }

  private getRandomShow(riderList: IShow[]): IShow {
    if (riderList.length) {
      const index = Math.floor(Math.random() * riderList.length);
      return riderList[index];
    }
    return {} as IShow
  }

  private setFavList(riderList: IShow[]): IShow[]{

    const fav_riders: IShow[] = []
    if (riderList.length > 3){
        for (let index = 0; index < 3; index++) {
          fav_riders.push(this.getRandomShow(riderList))
      }
      this.actualShow = fav_riders[0]
    }
    return fav_riders

  }
  private loadSeries(): void {
    this.seriesService.getShows().pipe(take(1)).subscribe((data) => {
      this.favRiders = this.setFavList(data)

    });

  }

  protected changeShow(event: IShow): void{
    this.actualShow = event 
  }


  private getUser(): void {
    const userId = 1;
    this.usersService.getUser(userId).subscribe((data) => {
      this.user.username = data.username;
      this.user.img = data.img;
    })};






}

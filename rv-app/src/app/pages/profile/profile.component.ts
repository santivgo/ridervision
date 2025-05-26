import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapse, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from '../../core/services/comment.service';
import { SeriesService } from '../../core/services/series.service';
import { DividerHorizontalComponent } from '../../shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CommentComponent } from '../../shared/components/comment/comment.component';
import { UsersService } from '../../core/services/users.service';
import { IShow } from '../../core/interfaces/models/show.interface';
import { IUser } from '../../core/interfaces/models/user.interface';
import { IComment, ICommentPreview } from '../../core/interfaces/models/comment.interface';
import { PostComponent } from "../../shared/components/post/post.component";
import { take } from 'rxjs';
import { FavShowBtnComponent } from "../../shared/components/fav-show-btn/fav-show-btn.component";
import { IRider } from '../../core/interfaces/models/rider.interface';
import { MuralComponent } from "./sections/mural/mural.component";
import { BaseChartDirective } from 'ng2-charts';
import { StatsComponent } from "../../shared/components/stats/stats.component";

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
    MuralComponent,
    StatsComponent
]
})
export class ProfileComponent implements OnInit{
  @Input({'alias': 'collapseRef', required: true}) collapse!: NgbCollapse;
  @Input() riders: IShow[] = [];

  selectedSection: string = 'posts'; 

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




  private getUser(): void {
    const userId = 1;
    this.usersService.getUser(userId).subscribe((data) => {
      this.user.username = data.username;
      this.user.img = data.img;
    })};






}

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
import { IComment } from '../../core/interfaces/models/comment.interface';
import { PostComponent } from "../../shared/components/post/post.component";
import { MuralComponent } from "./sections/mural/mural.component";
import { StatsComponent } from "../../shared/components/stats/stats.component";
import { PostService } from '../../core/services/post.service';
import { IPost } from '../../core/interfaces/models/post.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
  imports: [CommonModule, NgbCollapseModule, DividerHorizontalComponent, CommentComponent, StatsComponent, PostComponent, MuralComponent]
})
export class ProfileComponent implements OnInit {
  @Input({'alias': 'collapseRef', required: true}) collapse!: NgbCollapse;
  @Input() riders: IShow[] = [];

  selectedSection: string = 'posts'; 
  user: IUser = {} as IUser;
  favRiders: IShow[] = [];
  comments: IComment[] = [];
  posts: IPost[] = [];
  error = '';
  userId = 0;

  constructor(
    private commentsService: CommentService,
    private postService: PostService,
    private userService: UsersService
  ) {}
  
  protected changeSection(section: string): void {
    this.selectedSection = section;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = data;
        console.log(data)
        this.userId = Number(data.id); 
        this.loadComments();
        this.loadPosts();
      },
    });
  }

  loadComments(): void {
    this.commentsService.getCommentsByUser(this.userId)
      .subscribe((data) => {
        this.comments = data;
      });
  }

  loadPosts(): void {
    this.postService.getPostByUser(this.userId)
      .subscribe((data) => {
        this.posts = data;
      });
  }
}
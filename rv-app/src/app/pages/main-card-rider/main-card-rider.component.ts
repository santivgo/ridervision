import { Component, OnInit } from '@angular/core';
import { CardRiderComponent } from '../../shared/components/main-cards/card-rider/card-rider.component';
import { CardHeaderDirective } from '../../core/directives/card-header.directive';
import { DividerHorizontalComponent } from '../../shared/components/dividers/divider-horizontal/divider-horizontal.component';
import { CardContentDirective } from '../../core/directives/card-content.directive';
import { DividerHorizontalGradientComponent } from '../../shared/components/dividers/divider-horizontal-gradient/divider-horizontal-gradient.component';
import { CommentComponent } from '../../shared/components/comment/comment.component';
import { CommentService } from '../../core/services/comment.service';
import { PostService } from '../../core/services/post.service';
import { CommonModule } from '@angular/common'
import { IComment } from '../../core/interfaces/models/comment.interface';
import { CommentInputComponent } from '../../shared/components/comment/comment-input/comment-input.component';
import { IPost } from '../../core/interfaces/models/post.interface';
import { UsersService } from '../../core/services/users.service';
import { Output, EventEmitter } from '@angular/core';
import { IRider } from '../../core/interfaces/models/rider.interface';
import { IShow } from '../../core/interfaces/models/show.interface';

@Component({
  selector: 'app-main-card-rider',
  imports: [CardRiderComponent, CardHeaderDirective, DividerHorizontalComponent, CardContentDirective, DividerHorizontalGradientComponent, CommentComponent, CommentInputComponent, CommonModule],
  templateUrl: './main-card-rider.component.html',
  styleUrl: './main-card-rider.component.sass'
})
export class MainCardRiderComponent implements OnInit {
  comments: IComment[] = [];
  post = {} as IPost;
  rider = {} as IRider;
  show = {} as IShow;
  isLogged: boolean = false;

  constructor(
    private commentsService: CommentService,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    this.loadPost();
  }

  checkLogin(): void {
    this.isLogged = !!localStorage.getItem('token');
  }

  loadPost(): void {
    this.postService.getDailyRider().subscribe((data: any) => {
      if (data && data.post) {
        this.post = data.post;
        this.show = data.shows[0];
        this.rider = data.tagged_riders[0];
        this.loadComments();
      }
    });
  }

  loadComments(): void {
    if (this.post.id) {
      this.commentsService.getCommentsByPost(this.post.id).subscribe((data) => {
        this.comments = data;
      });
    }
  }

  onCommentSent() {
    this.loadComments();
  }
}

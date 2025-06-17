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

@Component({
  selector: 'app-main-card-rider',
  imports: [CardRiderComponent, CardHeaderDirective, DividerHorizontalComponent, CardContentDirective, DividerHorizontalGradientComponent, CommentComponent, CommentInputComponent, CommonModule],
  templateUrl: './main-card-rider.component.html',
  styleUrl: './main-card-rider.component.sass'
})
export class MainCardRiderComponent implements OnInit {
  imgSrc: string = '/assets/MiBRrBm.png';
  riderName: string = 'MAJEDE';
  riderDescription: string = 'from kamen rider gotchard';
  textAreaTitle: string = 'BASE FORM';
  textAreaContent: string = `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`;
  comments: IComment[] = [];
  post = {} as IPost;
  intervalId: any;

  constructor(
    private commentsService: CommentService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadPost();
    //this.loadComments();
  }

  loadPost(): void{
    this.postService.getDailyPost()
    .subscribe((data) => {
      console.log(data)
      this.post = data[0];
    });
  }

  loadComments(): void{
    const postId = 1; // TEMPORARIO
    this.commentsService.getPostComments(postId)
    .subscribe((data) => {
      this.comments = data;
    });
  }
}

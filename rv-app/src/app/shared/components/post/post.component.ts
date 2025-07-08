import { Component, EventEmitter, Output, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../tag/tag.component';
import { IPost } from '../../../core/interfaces/models/post.interface';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { UsersService } from '../../../core/services/users.service';
import { IUser } from '../../../core/interfaces/models/user.interface';
import { CommentService } from '../../../core/services/comment.service';
import { IComment } from '../../../core/interfaces/models/comment.interface';
import { ButtonModule } from "primeng/button";
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';

@Component({
  selector: 'app-post',
  imports: [TagComponent, CommonModule, PostCommentComponent, ButtonModule, ContextMenu],
  templateUrl: './post.component.html',
  styleUrl: './post.component.sass'
})
export class PostComponent implements OnInit{
  @Input({required: true}) post = {} as IPost;
  @ViewChild('cm') cm!: ContextMenu;
  @Output() editEmitter: EventEmitter<IPost> = new EventEmitter<IPost>() 

  items: MenuItem[] | undefined;
  

  user: IUser = {} as IUser;
  comments: IComment[] = [];

  exibirComments: boolean = false
  expandedImg: string | null = null;

   ngOnInit(): void {
    this.items = [
      {
          label: 'Editar',
          icon: 'pi pi-file-edit',
          command: ()=> {
            this.editEmitter.emit(this.post)
          }
      },
      {
          label: 'Deletar',
          icon: 'pi pi-trash',
          command: ()=> {

          }
      }           
    ]

    this.loadUser();
    this.loadComments();
  }

  @Output() expandImage = new EventEmitter<string>();

  constructor(
    private userService: UsersService,
    private commentsService: CommentService,
  ) {}

  toggleComments(): void {
    this.exibirComments = !this.exibirComments
  }



  loadUser(): void {
    this.userService.getUser(Number(this.post.author))
      .subscribe((data) => {
        this.user = data;
      });
  }

  loadComments(): void {
    this.commentsService.getCommentsByPost(Number(this.post.id))
      .subscribe((data) => {
        this.comments = data;
      });
  }

  expandImg(imgUrl: string) {
    this.expandedImg = imgUrl;
  }

  closeModal() {
    this.expandedImg = null;
  }

  onContextMenu(event: MouseEvent) {
      this.cm.show(event);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../core/services/post.service';
import { IPost } from '../../core/interfaces/models/post.interface';
import { PostComponent } from '../../shared/components/post/post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.sass'
})
export class FeedComponent implements OnInit {
  posts: IPost[] = [];
  error = '';
  expandedImg: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => this.posts = data.filter(post => !!post.img),
      error: (err) => this.error = 'Erro ao carregar o feed.'
    });
  }

  onExpandImage(imgUrl: string) {
    this.expandedImg = imgUrl;
  }

  closeModal() {
    this.expandedImg = null;
  }
}

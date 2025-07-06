import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.sass'
})
export class NewPostComponent {
  @Input() user: any;
  @Input() availableRiders: any[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() postCreated = new EventEmitter<any>();

  newPost = {
    content: '',
    img: null as File | null,
    tagged_riders: [] as number[]
  };
  selectedRiders: any[] = [];
  imgPreview: string | null = null;
  error = '';

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 6;

  constructor(private postService: PostService) {}

  get filteredRiders(): any[] {
    if (!this.searchTerm.trim()) return this.availableRiders;
    return this.availableRiders.filter(r => r.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  get paginatedRiders(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRiders.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRiders.length / this.pageSize) || 1;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newPost.img = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleRiderSelection(rider: any): void {
    const index = this.selectedRiders.findIndex(r => r.id === rider.id);
    if (index > -1) {
      this.selectedRiders.splice(index, 1);
    } else {
      this.selectedRiders.push(rider);
    }
    this.newPost.tagged_riders = this.selectedRiders.map(r => r.id);
  }

  isRiderSelected(rider: any): boolean {
    return this.selectedRiders.some(r => r.id === rider.id);
  }

  resetForm(): void {
    this.newPost = {
      content: '',
      img: null,
      tagged_riders: []
    };
    this.selectedRiders = [];
    this.imgPreview = null;
  }

  close(): void {
    this.resetForm();
    this.closeModal.emit();
  }

  createPost(): void {
    if (!this.newPost.content.trim() || !this.newPost.img || this.newPost.tagged_riders.length === 0) {
      this.error = 'Preencha o texto, selecione pelo menos um Rider e uma imagem.';
      return;
    }
    this.error = '';
    const formData = new FormData();
    formData.append('content', this.newPost.content);
    formData.append('date', new Date().toISOString().split('T')[0]);
    formData.append('author', this.user?.id?.toString() || '');
    if (this.newPost.img) {
      formData.append('img', this.newPost.img);
    }
    this.newPost.tagged_riders.forEach((riderId: number) => {
      formData.append('tagged_riders', riderId.toString());
    });
    this.postService.createPost(formData).subscribe({
      next: (response) => {
        this.postCreated.emit(response);
        this.close();
      },
      error: (err) => {
        this.error = 'Erro ao criar o post. Tente novamente.';
      }
    });
  }
}

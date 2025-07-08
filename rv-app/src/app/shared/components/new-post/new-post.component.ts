import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../core/services/post.service';
import { IRider } from '../../../core/interfaces/models/rider.interface';
import { IPost } from '../../../core/interfaces/models/post.interface';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.sass'
})
export class NewPostComponent implements OnInit {
  @Input() user: any;
  @Input() availableRiders: IRider[] = [];
  @Input() editPost: any | undefined
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
  
  ngOnInit(): void {
    if (this.editPost){
      this.newPost = {
        content: this.editPost.content,
        img: null, // lembrar que isso pode bugar ***ponto de bug talvez***
        tagged_riders: this.editPost.tagged_riders
      }
      this.imgPreview = this.editPost.img
      this.selectedRiders = this.newPost.tagged_riders
    }
  }
  constructor(private postService: PostService, private messageService: MessageService) {}

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
    const index = this.selectedRiders.findIndex(r => r === rider.id);
    if (index > -1) {
      this.selectedRiders.splice(index, 1);
    } else {
      this.selectedRiders.push(rider.id);
    }
    this.newPost.tagged_riders = this.selectedRiders;
  }

  isRiderSelected(rider: any): boolean {
    return this.selectedRiders.some(r => r === rider.id);
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
    if (!!!this.editPost && (!this.newPost.content.trim() || !this.newPost.img || this.newPost.tagged_riders.length === 0)) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Preencha o texto, selecione pelo menos um Rider e uma imagem.', life: 3000 });
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

    if (!!this.editPost){
      this.postService.updatePost(this.editPost.id, formData).subscribe({

        next: (response) => {
          
          this.postCreated.emit(response);
          this.close();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Erro ao criar o post. Tente novamente.', life: 3000 });
          this.error = 'Erro ao criar o post. Tente novamente.';
        }
      });
    }else{
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
   
}

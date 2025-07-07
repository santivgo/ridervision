import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, ToastModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',

  styleUrl: './login.component.sass'
})
export class LoginComponent {
  constructor(private router: Router, private readonly _usersService: UsersService, private messageService: MessageService){}
  loginForm!: FormGroup

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    },)
  }
 get username() {
      return this.loginForm.get('username')!;
  }
  get password() {
      return this.loginForm.get('password')!;
  }

  submit(){
    const {username, password} = this.loginForm.value
     this._usersService.loginUser({username, password}).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Login efetuado com sucesso!', detail: '', life: 2000 });
         setTimeout(() => {
          this._usersService.saveTokens(response);
          this.router.navigate(['/perfil']).then(() => {
            window.location.reload(); // ← Força reload da página
          });
        }, 1000);

      },
      error: (err) => {
          for (const erroChave in err.error){
            if(!Array.isArray(erroChave)){
              this.messageService.add({ severity: 'error', summary: 'Erro!', detail: err.error[erroChave], life: 10000 });

            }else{
              for (const erro of err.error[erroChave]){
                this.messageService.add({ severity: 'error', summary: 'Erro!', detail: erro, life: 10000 });
              }
            }

           
          }
      },})

  }
}

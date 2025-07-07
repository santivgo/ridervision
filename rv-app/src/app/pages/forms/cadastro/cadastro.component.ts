import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customPasswordMismatch } from '../validators/custom-password-mismatch.validator';
import { IUserRegister } from '../../../core/interfaces/auth/auth.interface'; 
import { UsersService } from '../../../core/services/users.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, ToastModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.sass'
})

export class CadastroComponent implements OnInit{
  constructor(private readonly _userService: UsersService, private messageService: MessageService, private router: Router) {}
  cadastroForm!: FormGroup
  submit(){
    if (this.cadastroForm.invalid){
        this.cadastroForm.markAllAsTouched();
        return

    }
    const {username, password, re_password } = this.cadastroForm.value
    const user: IUserRegister = { username, password, re_password}
    this._userService.registerUser(user).subscribe({
        next: () => {
       

        this.messageService.add({ severity: 'success', summary: 'Cadastro efetuado com sucesso!', detail: '', life: 2000 });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);

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
        }
      });
    }

  get username() {
      return this.cadastroForm.get('username')!;
  }
  get password() {
      return this.cadastroForm.get('password')!;
  }
  get rpassword() {
      return this.cadastroForm.get('rpassword')!;
  }


  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rpassword: new FormControl('', [Validators.required])
    }, {validators: customPasswordMismatch})
  }

}

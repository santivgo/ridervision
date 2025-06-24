import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customPasswordMismatch } from '../validators/custom-password-mismatch.validator';
import { IUserRegister } from '../../../core/interfaces/auth/auth.interface'; 
import { UsersService } from '../../../core/services/users.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    const {username, password, re_password } = this.cadastroForm.value
    const user: IUserRegister = { username, password, re_password}
    this._userService.registerUser(user).subscribe({
        next: () => {
          this.messageService.addAll([
            { severity: 'success', summary: 'Message 1', detail: 'Message Content' },
            { severity: 'info', summary: 'Message 2', detail: 'Message Content' },
            { severity: 'warn', summary: 'Message 3', detail: 'Message Content' },
            { severity: 'error', summary: 'Message 4', detail: 'Message Content' }

        ]);

        this.router.navigate(['/login']);

        },
        error: (err) => {
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

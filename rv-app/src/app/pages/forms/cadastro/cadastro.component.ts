import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customPasswordMismatch } from '../validators/custom-password-mismatch.validator';
import { IUserRegister } from '../../../core/interfaces/models/user.interface'; 
import { UsersService } from '../../../core/services/users.service';
import { __asyncDelegator } from 'tslib';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.sass'
})

export class CadastroComponent implements OnInit{
  constructor(private readonly _userService: UsersService) {}
  cadastroForm!: FormGroup
  submit(){
    const {username, password } = this.cadastroForm.value
    const user: IUserRegister = { username, password}
    this._userService.registerUser(user).subscribe({
        next: () => {
          console.log('Cadastro feito com sucesso!');
          // Aqui você pode chamar o login automático, navegar ou mostrar um alerta
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);
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

import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  constructor(private router: Router, private readonly _usersService: UsersService){}
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
        this._usersService.saveTokens(response);
        this.router.navigate(['/perfil']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
      },})

  }
}

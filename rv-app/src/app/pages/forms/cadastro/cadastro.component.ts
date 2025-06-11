import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customPasswordMismatch } from '../validators/custom-password-mismatch.validator';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.sass'
})

export class CadastroComponent implements OnInit{

  cadastroForm!: FormGroup
  submit(){
    console.log("submeteu!")
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
      id: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rpassword: new FormControl('', [Validators.required])
    }, {validators: customPasswordMismatch})
  }

}

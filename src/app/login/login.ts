import { Component, Input, signal } from '@angular/core';
import { Check } from '@primeicons/angular/check';
import { loginSchema, type LoginFormData } from './login-form';
import { form, FormField, validateStandardSchema } from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputPasswordModule } from 'primeng/inputpassword';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Eye } from '@primeicons/angular/eye';
import { EyeSlash } from '@primeicons/angular/eye-slash';
import { Button, ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'login',
  imports: [
    InputTextModule,
    Check,
    FormField,
    FloatLabelModule,
    Eye,
    EyeSlash,
    InputPasswordModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    RouterLink
  ],
  providers: [],
  templateUrl: './login.html',
})
export class Login {
  loginModel = signal<LoginFormData>({
    email: '',
    password: '',
  });
  mask: boolean = true

  loginForm = form(this.loginModel, (path) => {
    validateStandardSchema(path, loginSchema);
  });

  checks = [
    'Ganhe uma nota de 0 a 100',
    'Verificação de coerência com a vaga',
    'Corrige erros de digitação e português',
  ];

  onSubmit(event: Event) {
    event?.preventDefault();

    const credentials = this.loginModel();
    console.log(`Credentials: ${credentials.email}`);
  }
}

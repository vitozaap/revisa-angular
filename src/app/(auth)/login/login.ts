import { Component, inject, signal } from '@angular/core';
import { Check } from '@primeicons/angular/check';
import { loginSchema, type LoginFormData } from './login-form';
import {
  form,
  FormField,
  validateStandardSchema,
} from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputPasswordModule } from 'primeng/inputpassword';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Router, RouterLink } from '@angular/router';
import { FieldError } from '../shared/field-error';
import { PasswordInput } from '../shared/password-input';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  imports: [
    InputTextModule,
    Check,
    FormField,
    FloatLabelModule,
    InputPasswordModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    MessageModule,
    RouterLink,
    PasswordInput,
    FieldError,
  ],
  providers: [],
  templateUrl: './login.html',
})
export class Login {
  private router = inject(Router);
  private userService = inject(UserService);

  loginModel = signal<LoginFormData>({
    email: '',
    password: '',
  });
  mask: boolean = true;
  loading = signal(false);
  error = signal('');

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

    // Marca todos os campos como mexidos p mostrar os erros de quem nem foi preenchido
    this.loginForm().markAsTouched();
    if (this.loginForm().invalid()) return;

    this.loading.set(true);
    this.error.set('');

    this.userService.login(this.loginModel()).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => {
        this.loading.set(false);
        this.error.set('E-mail ou senha incorretos.');
      },
    });
  }
}

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
import { Router, RouterLink } from '@angular/router';
import { FieldError } from '../shared/field-error';
import { PasswordInput } from '../shared/password-input';

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
    RouterLink,
    PasswordInput,
    FieldError,
  ],
  providers: [],
  templateUrl: './login.html',
})
export class Login {
  private router = inject(Router);

  loginModel = signal<LoginFormData>({
    email: '',
    password: '',
  });
  mask: boolean = true;

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

    // Marca todos os campos como tocados para mostrar os erros de quem nem foi preenchido
    this.loginForm().markAsTouched();
    if (this.loginForm().invalid()) return;

    const credentials = this.loginModel();
    console.log(`Credentials: ${credentials.email}`);

    //dev, apenas para demonstração, validação virá antes para criar sessão do usuário
    this.router.navigate(['/home']);
  }
}

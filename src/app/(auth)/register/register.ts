import { Component, inject, signal } from '@angular/core';
import { form, FormField, validateStandardSchema } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputPasswordModule } from 'primeng/inputpassword';
import { InputTextModule } from 'primeng/inputtext';
import { type RegisterFormData, registerSchema } from './register-form';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { FieldError } from '../shared/field-error';
import { PasswordInput } from '../shared/password-input';
import { UserService } from '../../services/user.service';

@Component({
  imports: [
    InputTextModule,
    FormField,
    FloatLabelModule,
    InputPasswordModule,
    PasswordInput,
    IconFieldModule,
    
    InputIconModule,
    ButtonModule,
    RouterLink,
    CheckboxModule,
    FieldError,
    MessageModule,
  ],
  selector: 'app-register',
  templateUrl: './register.html',
})
export class Register {
  private router = inject(Router);
  private userService = inject(UserService);

  registerModel = signal<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    termsAndPrivacy: false,
  });
  loading = signal(false);
  error = signal('');

  registerForm = form(this.registerModel, (path) => {
    validateStandardSchema(path, registerSchema);
  });

  onSubmit(event: Event) {
    event?.preventDefault();

    // Marca todos os campos como mexidos p mostrar os erros de quem nem foi preenchido
    this.registerForm().markAsTouched();
    if (this.registerForm().invalid()) return;

    this.loading.set(true);
    this.error.set('');

    const { name, email, password } = this.registerModel();
    this.userService.register({ name, email, password }).subscribe({
      // O cadastro não cria sessão, então já faz o login logo em seguida
      next: () => {
        this.userService.login({ email, password }).subscribe({
          next: () => this.router.navigate(['/home']),
          error: () => this.showError(),
        });
      },
      error: () => this.showError(),
    });
  }

  private showError() {
    this.loading.set(false);
    this.error.set('Não foi possível criar sua conta.');
  }
}

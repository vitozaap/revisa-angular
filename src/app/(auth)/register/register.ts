import { Component, signal } from '@angular/core';
import { form, FormField, validateStandardSchema } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputPasswordModule } from 'primeng/inputpassword';
import { InputTextModule } from 'primeng/inputtext';
import { type RegisterFormData, registerSchema } from './register-form';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldError } from '../shared/field-error';
import { PasswordInput } from '../shared/password-input';

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
  ],
  selector: 'app-register',
  templateUrl: './register.html',
})
export class Register {
  registerModel = signal<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    termsAndPrivacy: false,
  });

  registerForm = form(this.registerModel, (path) => {
    validateStandardSchema(path, registerSchema);
  });

  onSubmit(event: Event) {
    event?.preventDefault();

    // Marca todos os campos como tocados para mostrar os erros de quem nem foi preenchido
    this.registerForm().markAsTouched();
    if (this.registerForm().invalid()) return;

    const credentials = this.registerModel();
    console.log(credentials);
  }
}

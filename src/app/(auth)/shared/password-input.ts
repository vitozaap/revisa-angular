import { Component, input } from '@angular/core';
import { type Field, FormField } from '@angular/forms/signals';
import { Eye } from '@primeicons/angular/eye';
import { EyeSlash } from '@primeicons/angular/eye-slash';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputPasswordModule } from 'primeng/inputpassword';
import { InputTextModule } from 'primeng/inputtext';
import { FieldError } from './field-error';

@Component({
  imports: [
    InputPasswordModule,
    FloatLabelModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    FormField,
    Eye,
    EyeSlash,
    FieldError,
  ],
  selector: 'password-input',
  templateUrl: './password-input.html',
})
export class PasswordInput {
  field = input.required<Field<string>>();
  label = input('Senha');
  inputId = input('password');

  mask: boolean = true;
}

import { Component, input } from '@angular/core';
import type { Field } from '@angular/forms/signals';

// Mostra a primeira mensagem de erro do campo depois que ele foi tocado
@Component({
  selector: 'field-error',
  template: `
    @let state = field()();
    @if (state.touched() && state.errors()[0]; as error) {
      <span class="text-xs text-danger" role="alert">{{ error.message }}</span>
    }
  `,
})
export class FieldError {
  field = input.required<Field<any>>();
}

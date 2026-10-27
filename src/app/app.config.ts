import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { RevisaPreset } from './revisa-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    // Marca os campos ainda não tocados, para o vermelho de erro só aparecer depois (ver styles.css)
    provideSignalFormsConfig({
      classes: { 'field-untouched': (field) => !field.state().touched() },
    }),
    providePrimeNG({
      license: environment.primeNgLicense,
      theme: {
        preset: RevisaPreset,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
  ],
};

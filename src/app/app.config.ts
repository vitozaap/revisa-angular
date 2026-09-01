import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      license:
        'eyJpZCI6ImE5ODVhMGViLTA5MjItNDlkZS1hODI3LTQ2ZTk2NmUxYTZjOSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODgyMjQ3OTAsImV4cCI6MTgxOTc2MDc5MH0.sGVd7q3KPVmX54Zf16pynBGFDBRFTltiSvaoM3fnm5oAjC3BUxodt3rO71DRlUYlMEBq0P58iYL6gvxYjXuUAA',
    }),
  ],
};

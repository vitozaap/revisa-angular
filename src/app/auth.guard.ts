import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { UserService } from './services/user.service';

// Só deixa abrir as telas logadas se o /auth/me responder se n, manda p login
export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  //usando pipe com map pq preciso que retorne um booleano e nao o usuário, dai seto como efeito colateral no signal do service
  return userService.me().pipe(
    // Guarda o usuário p a sidebar e a home mostrarem o nome
    map((user) => {
      userService.user.set(user);
      return true;
    }),
    // serve pra quando da erro na requisição, redireciona pro /login dnv
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};

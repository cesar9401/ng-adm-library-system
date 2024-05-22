import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/adm/current-user.service';

export const allowNavigationGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const currentUserService = inject(CurrentUserService);

  console.log(state.url);
  const url = state.url;
  const isAuthenticated = currentUserService.isAuthenticated();

  if (url === '' || url === '/') {
    if (isAuthenticated) {
      void router.navigate(['/home']);
      return !isAuthenticated;
    }

    return true;
  }

  if (!isAuthenticated) {
    void router.navigate(['/']);
    return false;
  }

  return isAuthenticated;
};

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private router: Router) {
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token;
  }

  logout() {
    localStorage.clear();
    void this.router.navigate(['/']);
  }
}

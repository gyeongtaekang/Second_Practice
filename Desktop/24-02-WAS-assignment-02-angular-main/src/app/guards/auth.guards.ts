import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('01bede4653551df3f6f5e17074771100') !== null;
    if (!isAuthenticated) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
}

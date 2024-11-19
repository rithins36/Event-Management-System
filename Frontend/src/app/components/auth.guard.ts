import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the user is logged in by verifying if the token exists
    if (localStorage.getItem('token')) {
      return true; // Allow access if logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Block access
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  userRole: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch the role from localStorage
    this.userRole = localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if user is logged in
  }

  logout() {
    localStorage.clear(); // Clear all stored data
    this.router.navigate(['/app-login']);
  }

  isActive(route: string): boolean {
    return this.router.url === route; // Check if the current route matches the given route
  }

}

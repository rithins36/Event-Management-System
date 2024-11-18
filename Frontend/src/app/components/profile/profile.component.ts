import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  role:any;

  ngOnInit(): void {
    // Retrieve the user data from localStorage
    const storedUser = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

}

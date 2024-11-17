import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface ApiResponse {
  issuccess: boolean;
  message: string;
  result?: any;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  isSignUpActive: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  switchToSignUp() {
    this.isSignUpActive = true;
  }

  switchToSignIn() {
    this.isSignUpActive = false;
  }


  onSignUp(form: any) {
    const data = {
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      phoneNumber: form.value.phone,
      role: form.value.role
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(data);

    this.http.post<ApiResponse>('https://localhost:7291/api/AuthAPI/register', data, { headers })
    .subscribe(
      (response) => {
        if (response.issuccess) {
          console.log('Registration successful:', response.message);
          alert('Registration successful: ' + response.message);
          this.switchToSignIn();
        } else {
          console.error('Registration failed:', response.message);
          alert('Registration failed: ' + response.message);
        }
      },
      (error) => {
        console.error('Registration error:', error);
        alert('An error occurred during registration. Please try again later.');
      }
    );    
  }

  onSignIn(form : any) {
    const data = {
      userName: form.value.email,
      password: form.value.password
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(data);

    this.http.post<any>('https://localhost:7291/api/AuthAPI/login', data, { headers })
    .subscribe(
      (response) => {
        if (response.result.token) {
          console.log('Login successful:', response);

          // Extract the role from the response

          // Store user details and token in localStorage
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);

          const userRole = response.role;

          // Navigate based on role
          if (userRole === 'Admin') {
            this.router.navigate(['/app-event-requests']);
          } else if (userRole === 'Host') {
            this.router.navigate(['/event-details']);
          } else if (userRole === 'Vendor') {
            this.router.navigate(['/vendor-dashboard']);
          } else {
            alert('Unknown role!');
          }
        } else {
          alert('Login failed: No token received.');
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again later.');
      }
    );  }

}

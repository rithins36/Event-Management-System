import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  isSignUpActive: boolean = false;
  constructor(private http: HttpClient) {}

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
  //   "email": "string",
  // "password": "string",
  // "name": "string",
  // "phoneNumber": "string",
  // "role": "string"
    console.log(data);

    this.http.post('https://localhost:7291/api/AuthAPI/register', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .subscribe(
      (response) => console.log('Registration successful:', response),
      (error) => console.error('Registration failed:', error)
    );
    
  }
  onSignIn() {
    // Handle Sign-In logic
    console.log('Sign-In submitted');
  }

}

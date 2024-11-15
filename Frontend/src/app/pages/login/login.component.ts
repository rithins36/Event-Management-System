import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignUpActive: boolean = false;

  switchToSignUp() {
    this.isSignUpActive = true;
  }

  switchToSignIn() {
    this.isSignUpActive = false;
  }

  onSignUp() {
    // Handle Sign-Up logic
    console.log('Sign-Up submitted');
  }

  onSignIn() {
    // Handle Sign-In logic
    console.log('Sign-In submitted');
  }

}

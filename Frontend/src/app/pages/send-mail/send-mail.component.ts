import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as emailjs from 'emailjs-com';
//npm install --save @emailjs/browser
//npm install emailjs-com 
@Component({
  selector: 'app-send-mail',
  standalone: true,
  imports: [FormsModule],
  template: `<form (ngSubmit)="sendEmail()">
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" [(ngModel)]="email" name="email" required>
  </div>
  
  <div>
    <label for="message">Message</label>
    <textarea id="message" [(ngModel)]="message" name="message" required></textarea>
  </div>

  <button type="submit">Send</button>
</form>


`,
  styleUrl: './send-mail.component.css'
})
export class SendMailComponent {
  email: string = '';
  message: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  // Replace with your EmailJS service ID, template ID, and user ID
  serviceID = 'service_6tpwnns';
  templateID = 'template_ssrwtyg';
  userID = '8fji1fGwT_k77d-yv';  // Your EmailJS user ID

  sendEmail() {
    const templateParams = {
      to_mail: this.email,
      message: this.message
    };

    emailjs.send(this.serviceID, this.templateID, templateParams, this.userID)
      .then((response) => {
        console.log('SUCCESS!', response);
        this.successMessage = 'Email sent successfully!';
        this.errorMessage = '';
      })
      .catch((error) => {
        console.error('FAILED...', error);
        this.errorMessage = 'Failed to send email. Please try again later.';
        this.successMessage = '';
      });
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'

})
export class EventDetailsComponent {
  event = {
    name: '',
    date: '',
    type: '',
  };

  constructor(private router: Router, private eventService: EventService) {}

  next() {
    if (this.event.name && this.event.date && this.event.type ) {
      this.eventService.setEventDetails(this.event);
      this.router.navigate(['/vendor-selection']);
    } else {
      alert("Please fill in all fields before proceeding.");
    }
  }
}
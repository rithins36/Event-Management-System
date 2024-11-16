import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-requests',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './event-requests.component.html',
  styleUrl: './event-requests.component.css'
})
export class EventRequestsComponent implements OnInit{
  events: any[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const apiUrl = 'https://localhost:7262/api/Event?status=null'; 
    // Adjust based on your API structure
    this.http.get<Event[]>(apiUrl).subscribe({
      next: (response: any[]) => {
        this.events = response;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Failed to fetch events.');
      }
    });
  }

  updateStatus(eventId: string, approve: boolean): void {
    const apiUrl = `https://localhost:7262/api/Event/changestatus/${eventId}`;
    const updatedStatus = { status: approve }; // Assuming PUT payload is just the status
    this.http.put(apiUrl, updatedStatus).subscribe({
      next: () => {
        this.events = this.events.filter(event => event.id !== eventId); // Remove the updated event from the list
        alert(`Event ${approve ? 'approved' : 'declined'} successfully.`);
      },
      error: () => {
        alert('Failed to update event status.');
      }
    });
  }

  

}

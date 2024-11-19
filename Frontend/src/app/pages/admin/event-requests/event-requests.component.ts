import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-event-requests',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './event-requests.component.html',
  styleUrl: './event-requests.component.css'
})
export class EventRequestsComponent implements OnInit {
  events: any[] = [];
  isLoading: boolean = true;

  venues = [
    { VenueId: 1, VenueName: 'Grand Hall', Address: '123 Main St', Capacity: 200, Rent: 5000 },
    { VenueId: 2, VenueName: 'City Banquet', Address: '456 Maple Ave', Capacity: 150, Rent: 4000 },
    { VenueId: 3, VenueName: 'Elegant Plaza', Address: '789 Oak Blvd', Capacity: 250, Rent: 6000 },
    { VenueId: 4, VenueName: 'Downtown Event Space', Address: '321 Pine Rd', Capacity: 300, Rent: 7000 },
    { VenueId: 5, VenueName: 'Skyline Rooftop', Address: '654 Elm St', Capacity: 100, Rent: 3500 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const apiUrl = 'https://localhost:7262/api/Event/status';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.events = response.map(event => ({
          ...event,
          venueName: this.getVenueName(event.venueId),
          vendorNames: [] // Placeholder for vendor names
        }));

        // Fetch vendor names for each event
        this.events.forEach(event => {
          if (event.vendorIds) {
            this.fetchVendorNames(event);
          }
        });

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        console.error('Failed to fetch events.');
      }
    });
  }

  getVenueName(venueId: number): string {
    const venue = this.venues.find(v => v.VenueId === venueId);
    return venue ? venue.VenueName : 'Unknown Venue';
  }

  fetchVendorNames(event: any): void {
    const vendorIds = event.vendorIds.split(',').map((id: string) => id.trim());
    const vendorNamePromises = vendorIds.map((id: string) =>
      this.http.get<any>(`https://localhost:7020/api/Vendors/${id}`).toPromise()
    );

    Promise.all(vendorNamePromises)
      .then(vendors => {
        event.vendorNames = vendors.map(vendor => vendor.name || 'Unknown Vendor');
      })
      .catch(() => {
        console.error(`Failed to fetch vendor names for event ID: ${event.id}`);
      });
  }

  updateStatus(eventId: string, approve: boolean): void {
    const apiUrl = `https://localhost:7262/api/Event/changestatus/${eventId}`;
    const updatedStatus = { status: approve };
    this.http.put(apiUrl, updatedStatus).subscribe({
      next: () => {
        this.events = this.events.filter(event => event.id !== eventId);
        alert(`Event ${approve ? 'approved' : 'declined'} successfully.`);
      },
      error: () => {
        alert('Failed to update event status.');
      }
    });
  }
}

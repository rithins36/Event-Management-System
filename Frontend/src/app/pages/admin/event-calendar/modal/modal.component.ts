import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'event-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
  <h3>{{ data.title }}</h3>
  <p><strong>Date:</strong> {{ data.meta.date | date }}</p>
  <p><strong>Venue:</strong> {{ venueName }}</p>
  <p><strong>Address:</strong>{{venueAddress}}</p>
  <p><strong>Type:</strong> {{ data.meta.type }}</p>
  <button mat-button (click)="closeDialog()">Close</button>
`,
styleUrl: './modal.component.css'

})
export class EventDetailsDialog {
  venues = [
    { VenueId: 1, VenueName: 'Grand Hall', Address: '123 Main St', Capacity: 200, Rent: 5000 },
    { VenueId: 2, VenueName: 'City Banquet', Address: '456 Maple Ave', Capacity: 150, Rent: 4000 },
    { VenueId: 3, VenueName: 'Elegant Plaza', Address: '789 Oak Blvd', Capacity: 250, Rent: 6000 },
    { VenueId: 4, VenueName: 'Downtown Event Space', Address: '321 Pine Rd', Capacity: 300, Rent: 7000 },
    { VenueId: 5, VenueName: 'Skyline Rooftop', Address: '654 Elm St', Capacity: 100, Rent: 3500 }
  ];
  
  // Assuming data.meta.venueId is the VenueId you want to find the VenueName for
  venueIdFromData = this.data.meta.venueId;
  
  // Finding the venue by VenueId
   selectedVenue = this.venues.find(venue => venue.VenueId === this.venueIdFromData);
  
  // Getting the VenueName from the found venue
  venueName = this.selectedVenue ? this.selectedVenue.VenueName : 'Venue not found';
  venueAddress = this.selectedVenue ? this.selectedVenue.Address : 'Venue not found';

  constructor(@Inject(MAT_DIALOG_DATA) public data: CalendarEvent, private dialog: MatDialog) {}

    closeDialog(): void {
      this.dialog.closeAll();  // Close the dialog
    }  
}

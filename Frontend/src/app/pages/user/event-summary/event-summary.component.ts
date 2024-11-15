import { Component, OnInit } from '@angular/core';
import { EventService } from '../event-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.css']
})
export class EventSummaryComponent implements OnInit {
  eventDetails: any;
  selectedVendors: any[] = [];
  selectedVenue: any;
  totalCost = 0;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventDetails = this.eventService.getEventDetails();
    this.selectedVendors = this.eventService.getVendors();
    this.selectedVenue = this.eventService.getVenue();
    
    // Calculate total cost including vendors and venue rent
    const vendorsTotal = this.selectedVendors.reduce((sum, vendor) => sum + vendor.cost, 0);
    this.totalCost = vendorsTotal + (this.selectedVenue?.Rent || 0);
  }

  makePayment() {

     // Convert selected vendor IDs to a comma-separated string
    const vendorIds = this.selectedVendors.map(vendor => vendor.vendorID).join(',');
    
    const eventPayload = {
      ...this.eventDetails,
      userId: 0,
      venueId: this.selectedVenue.VenueId,
      vendorIds,
      // totalCost: this.totalCost,
    };
    console.log(eventPayload);

    this.eventService.postEvent(eventPayload).subscribe(
      (response) => {
        alert('Event created successfully!');
        // Add further payment logic here if needed
      },
      (error) => {
        alert('Failed to create event. Please try again.');
      }
    );
  }
}

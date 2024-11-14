import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VendorService } from '../../vendor/dashboard/vendor.service';

@Component({
  selector: 'app-vendor-selection',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './vendor-selection.component.html',
  styleUrl: './vendor-selection.component.css'
})
export class VendorSelectionComponent implements OnInit {
  vendors: any[] = [];

  //Hardcoded Venue list
  venues = [
    { venueId: 1, VenueName: 'Grand Hall', Address: '123 Main St', Capacity: 200, Rent: 5000 },
    { venueId: 2, VenueName: 'City Banquet', Address: '456 Maple Ave', Capacity: 150, Rent: 4000 },
    { venueId: 3, VenueName: 'Elegant Plaza', Address: '789 Oak Blvd', Capacity: 250, Rent: 6000 },
    { venueId: 4, VenueName: 'Downtown Event Space', Address: '321 Pine Rd', Capacity: 300, Rent: 7000 },
    { venueId: 5, VenueName: 'Skyline Rooftop', Address: '654 Elm St', Capacity: 100, Rent: 3500 }
  ];

  selectedVenue: any; // Holds the currently selected venue
  
  constructor(
    private router: Router, 
    private eventService: EventService, 
    private vendorService: VendorService
    ) {}

  ngOnInit() {
    // Fetch the vendors list from the API
    this.vendorService.fetchVendors().subscribe((data) => {
      this.vendors = data;
    });
  }

  next() {
    const selectedVendors = this.vendors.filter(v => v.selected);
    this.eventService.setVendorsAndVenue(selectedVendors, this.selectedVenue); // Pass vendors and venue
    this.router.navigate(['/event-summary']);
  }
}
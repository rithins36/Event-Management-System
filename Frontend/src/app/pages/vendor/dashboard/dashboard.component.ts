import { Component } from '@angular/core';
import { VendorService } from './vendor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'vendor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  vendor = {
    name: '',
    email: '',
    contactInfo: '',
    serviceType: '',
    cost: 0
  }

  constructor(private vendorService: VendorService) { }

  onSubmit() {
    this.vendorService.addVendor(this.vendor).subscribe(
      response => {
        console.log('Vendor added successfully:', response);
      },
      error => {
        console.error('Error adding vendor:', error);
      }
    );
  }
}

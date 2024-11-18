import { Component } from '@angular/core';
import { VendorService } from './vendor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'vendor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  vendor = {
    name: '',
    email: '',
    contactInfo: '',
    serviceType: '',
    cost: 0
  };

  registrationSuccess = false; // Tracks success state

  constructor(private vendorService: VendorService) { }

  onSubmit() {
    if (this.vendor.name && this.vendor.email && this.vendor.contactInfo && this.vendor.serviceType && this.vendor.cost ) {
      this.vendorService.addVendor(this.vendor).subscribe(
        response => {
          console.log('Vendor added successfully:', response);
          this.registrationSuccess = true; // Set success state
        },
        error => {
          console.error('Error adding vendor:', error);
        }
      );
    } else {
      alert("Please fill in all fields before proceeding.");
    }
    
  }
}

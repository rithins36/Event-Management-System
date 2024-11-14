import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventDetails: any;
  private selectedVendors: any[] = [];
  private selectedVenue: any;
  private apiUrl = 'https://localhost:7262/api/Event';
  
  constructor(private http: HttpClient) {}

  setEventDetails(details: any) {
    this.eventDetails = details;
  }

  getEventDetails() {
    return this.eventDetails;
  }

  setVendorsAndVenue(vendors: any[], venue: any) {
    this.selectedVendors = vendors;
    this.selectedVenue = venue;
  }

  getVendors() {
    return this.selectedVendors;
  }

  getVenue() {
    return this.selectedVenue;
  }

  // Post event details to the API
  postEvent(details: any): Observable<any> {
    return this.http.post(this.apiUrl, details);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Vendor {
  name: string;
  email: string;
  contactInfo: string;
  serviceType: string;
  cost: number;
}

@Injectable({
  providedIn: 'root'
})

export class VendorService {

  private apiUrl = "https://localhost:7020/api/Vendors";

  constructor(private http : HttpClient) { }

  addVendor(vendor : Vendor){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, vendor, { headers });  }
}
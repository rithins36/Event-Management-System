import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarA11y, CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter, CalendarModule, CalendarMonthViewComponent, CalendarUtils, DateAdapter } from 'angular-calendar';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventDetailsDialog } from './modal/modal.component';

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [FormsModule, CalendarModule, CommonModule, SidebarComponent, MatDialogModule],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
    {
      provide: CalendarUtils,
      useFactory: (dateAdapter: DateAdapter) => new CalendarUtils(dateAdapter),
      deps: [DateAdapter],
    },
    {
      provide: CalendarA11y,
      useClass: CalendarA11y,
    },
    {
      provide: CalendarDateFormatter,
    },
    {
      provide: CalendarEventTitleFormatter,
    },
  ],
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})

export class EventCalendarComponent implements OnInit {
  viewDate: Date = new Date(); // Set current date
  events: CalendarEvent[] = []; // Array to hold the events
  isLoading: boolean = true;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchApprovedEvents();
  }

  fetchApprovedEvents(): void {
    const apiUrl = 'https://localhost:7262/api/Event/status?status=true'; // Adjust your API endpoint accordingly
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        // Map the API response to calendar events
        this.events = response.map(event => ({
          start: new Date(event.date), // Ensure the start date is correctly formatted
          title: `${event.name} `, // Event details
          meta: event, // Store the full event data as metadata
        }));
        console.log(this.events);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Failed to load approved events.');
      }
    });
  }

  handleEventClick(event: CalendarEvent): void {
    
    this.dialog.open(EventDetailsDialog, {
      width: '400px',
      panelClass: 'custom-dialog',
      data: event, // Pass event details as data to the modal
    });
    console.log(event.meta);
  }}

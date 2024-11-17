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
  <p><strong>Date:</strong> {{ data.meta.start | date }}</p>
  <p><strong>Venue:</strong> {{ data.meta.venueId }}</p>
  <p><strong>Type:</strong> {{ data.meta.type }}</p>
  <button mat-button (click)="closeDialog()">Close</button>
`,
})
export class EventDetailsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CalendarEvent, private dialog: MatDialog) {}

    closeDialog(): void {
      this.dialog.closeAll();  // Close the dialog
    }  
}

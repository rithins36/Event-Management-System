import { Routes } from '@angular/router';
import { EventDetailsComponent } from './pages/user/event-details/event-details.component';
import { VendorSelectionComponent } from './pages/user/vendor-selection/vendor-selection.component';
import { EventSummaryComponent } from './pages/user/event-summary/event-summary.component';
import { DashboardComponent } from './pages/vendor/dashboard/dashboard.component';
import { MainComponent } from './pages/landing/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { EventRequestsComponent } from './pages/admin/event-requests/event-requests.component';
import { EventCalendarComponent } from './pages/admin/event-calendar/event-calendar.component';
import { AuthGuard } from './components/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app-login', pathMatch: 'full' },
  { path: 'app-main', component: MainComponent },
  { path: 'app-login', component: LoginComponent },
  { 
    path: 'app-event-calendar', 
    component: EventCalendarComponent, 
    canActivate: [AuthGuard] // Protected by AuthGuard
  },
  { 
    path: 'app-event-requests', 
    component: EventRequestsComponent, 
    canActivate: [AuthGuard] // Protected by AuthGuard
  },
  { 
    path: 'event-details', 
    component: EventDetailsComponent, 
    canActivate: [AuthGuard] // Protected by AuthGuard
  },
  { 
    path: 'vendor-selection', 
    component: VendorSelectionComponent, 
    canActivate: [AuthGuard] // Protected by AuthGuard
  },
  { 
    path: 'event-summary', 
    component: EventSummaryComponent, 
    canActivate: [AuthGuard] // Protected by AuthGuard
  },
  { 
    path: 'vendor-dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] // Protected by AuthGuard
  },
  { 
    path: 'app-profile', 
    component: ProfileComponent, 
  },
];

import { Routes } from '@angular/router';
import { EventDetailsComponent } from './pages/user/event-details/event-details.component';
import { VendorSelectionComponent } from './pages/user/vendor-selection/vendor-selection.component';
import { EventSummaryComponent } from './pages/user/event-summary/event-summary.component';
import { DashboardComponent } from './pages/vendor/dashboard/dashboard.component';
import { MainComponent } from './pages/landing/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { EventRequestsComponent } from './pages/admin/event-requests/event-requests.component';

export const routes: Routes = [
    { path: '', redirectTo: '/app-event-requests', pathMatch: 'full' }, 
    { path : 'app-main' , component: MainComponent},
    { path: 'app-login', component: LoginComponent},
    {path: 'app-event-requests', component: EventRequestsComponent},
    { path: 'event-details', component: EventDetailsComponent },
    { path: 'vendor-selection', component: VendorSelectionComponent },
    { path: 'event-summary', component: EventSummaryComponent },
    { path: 'vendor-dashboard', component: DashboardComponent}
];

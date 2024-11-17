import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./pages/vendor/dashboard/dashboard.component";
// import { LoginComponent } from "./components/login/login.component";
import { EventDetailsComponent } from "./pages/user/event-details/event-details.component";
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardComponent,
    // LoginComponent,
    EventDetailsComponent,
    HttpClientModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Frontend';
}

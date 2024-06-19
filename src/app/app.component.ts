import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from "./services/auth.service";
import {FullCalendarModule} from "@fullcalendar/angular";
import {EventService} from "./services/event.service";
import {RoleGuard} from "./guards/role.guard";
import {UserService} from "./services/user.service";
import {DataTablesModule} from "angular-datatables";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FullCalendarModule, DataTablesModule, CalendarComponent, RouterLink, NgIf],
  providers: [AuthService,EventService, UserService, RoleGuard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EventManagement';

  eventCount: number = 0;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.fetchEventCount();
  }

  fetchEventCount(): void {
    this.eventService.getAllEvents().subscribe(
      (events: any[]) => {
        this.eventCount = events.length; // Assuming events is an array of events
      },
      (error) => {
        console.error('Error fetching event count', error);
        // Handle error (e.g., display error message)
      }
    );
  }

  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
  }
}

import {Component, OnInit} from '@angular/core';
import {CalendarComponent} from "../calendar/calendar.component";
import {RouterLink} from "@angular/router";
import {EventService} from "../../services/event.service";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CalendarComponent,
    RouterLink
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  eventCount: number = 0;

  constructor(
    private eventService: EventService,
  private authService: AuthService,
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

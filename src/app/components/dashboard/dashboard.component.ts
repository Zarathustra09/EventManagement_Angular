import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import {RouterLink} from "@angular/router";
import {CalendarComponent} from "../calendar/calendar.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    RouterLink,CalendarComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  eventCount: number = 0;
  loggedInUsername: string = '';

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchEventCount();
    console.log(localStorage.getItem('username'));
    this.loggedInUsername = localStorage.getItem('username') || '';
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

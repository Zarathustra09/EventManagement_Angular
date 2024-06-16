import { Component } from '@angular/core';
import {CalendarComponent} from "../calendar/calendar.component";
import {RouterLink} from "@angular/router";


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
export class DashboardComponent {

}

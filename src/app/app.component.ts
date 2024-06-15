import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from "./services/auth.service";
import {FullCalendarModule} from "@fullcalendar/angular";
import {EventService} from "./services/event.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FullCalendarModule],
  providers: [AuthService,EventService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EventManagement';
}

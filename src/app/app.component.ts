import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from "./services/auth.service";
import {FullCalendarModule} from "@fullcalendar/angular";
import {EventService} from "./services/event.service";
import {RoleGuard} from "./guards/role.guard";
import {UserService} from "./services/user.service";
import {DataTablesModule} from "angular-datatables";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FullCalendarModule, DataTablesModule],
  providers: [AuthService,EventService, UserService, RoleGuard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EventManagement';
}

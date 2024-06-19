import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {DataTablesModule} from "angular-datatables";
import {Router, RouterLink} from "@angular/router";
import {CalendarComponent} from "../calendar/calendar.component";
import {EventService} from "../../services/event.service";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, DataTablesModule, CalendarComponent, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  eventCount: number = 0;

  constructor(private userService: UserService, private router: Router,   private eventService: EventService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchEventCount();
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  editUser(id: number): void {
    if (id !== undefined) {
      this.router.navigate(['/update-user', id]);
    } else {
      console.error('User id is undefined');
    }
  }

  deleteUser(id: number): void {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(id).subscribe(
          () => {
            console.log(`User with id ${id} deleted successfully`);
            // Refresh user list after deletion
            this.users = this.users.filter(user => user.id !== id);
          },
          (error) => {
            console.error(`Error deleting user with id ${id}`, error);
          }
        );
      }
    } else {
      console.error('User id is undefined');
    }
  }

  getRoleName(role: number): string {
    return role === 0 ? 'User' : role === 1 ? 'Admin' : 'Unknown';
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

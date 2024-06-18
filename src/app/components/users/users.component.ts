import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {DataTablesModule} from "angular-datatables";


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, DataTablesModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}

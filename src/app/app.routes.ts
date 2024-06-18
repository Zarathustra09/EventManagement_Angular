import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {CreateEventComponent} from "./components/create-event/create-event.component";
import {UpdateEventComponent} from "./components/update-event/update-event.component";
import {RoleGuard} from "./guards/role.guard";
import {UsersComponent} from "./components/users/users.component";
import {UpdateUserComponent} from "./components/update-user/update-user.component";


export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'create-event', component: CreateEventComponent},
  { path: 'update-event/:id', component: UpdateEventComponent},
  {path: 'users', component: UsersComponent},
  {path: 'update-user/:id', component: UpdateUserComponent}
];

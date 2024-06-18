import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    // Add FormsModule to the imports array
    // Other modules
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('https://localhost:7198/api/Authentication/login', loginData)
      .subscribe(
        response => {
          // Store the token in browser storage or cookie
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role.toString());
          // Redirect to a protected route or dashboard
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error:', error);
          // Handle login error (e.g., show error message)
        }
      );
  }
}

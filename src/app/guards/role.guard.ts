import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


    console.log(route.data['expectedRole']);
    const expectedRole = route.data['expectedRole']; // Accessing using square brackets
    const storedRole = this.authService.getRole();

    if (!storedRole || storedRole !== expectedRole.toString()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

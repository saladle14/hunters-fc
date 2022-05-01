import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth_service: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot
    // state: RouterStateSnapshot
  ) // : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const expectedRole = route.data.roles;
    // return true if user role is not expectedRole
    var notRole = (expectedRole!=undefined && this.auth_service.role != expectedRole);

    // Redirect to login page if the user is not authenticated
    if (!this.auth_service.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    // Alarm when user is not granted to access the resource
    else if (notRole) {
      alert('This function require Administration');
      return false;
    }
    return true;
  }
}

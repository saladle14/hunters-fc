import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export enum Role {
  Guess = 'Guess',
  User = 'User',
  Admin = 'Admin',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login_success = false;
  role: Role;
  constructor(private router: Router) {}

  login(log_email, log_pw) {
    //Guess role
    if (log_email == "guess" && log_pw == "123") {
      this.login_success = true;
      this.role = Role.Guess;
    }
    //User role
    else if (log_email == 'user' && log_pw == '123') {
      this.login_success = true;
      this.role = Role.User;
    }
    //Admin role
    else if (log_email == 'admin' && log_pw == '123') {
      this.login_success = true;
      this.role = Role.Admin;
    } else {
      this.login_success = false;
    }
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    // return true if the user enter correct user name and password
    return this.login_success;
  }
}

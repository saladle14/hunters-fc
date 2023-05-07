import { element } from 'protractor';
import { UserService } from './../services/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  log_email: string;
  log_pw: string;
  userList: any;
  currentUser: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  async getAllUsers() {
    var res = await this.userService.getAllUsers().toPromise;
    this.userList = res;
  }

  login(){
    this.authService.login(this.log_email, this.log_pw);
    Object.keys(this.userList).forEach((element) => {
      if (this.userList[element].userName === this.log_email) {
        if (this.userList[element].password === this.log_pw) {
          this.currentUser = this.userList[element];
          this.authService.setCurrentUser(this.currentUser);
        }
      }
    })
  }
}

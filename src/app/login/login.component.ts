import { AuthService } from './../shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  log_email: string;
  log_pw: string;

  constructor(private fb: FormBuilder, private auth_service: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
  login(): void {
    // for (const i in this.loginForm.controls) {
    //   this.loginForm.controls[i].markAsDirty();
    //   this.loginForm.controls[i].updateValueAndValidity();
    // }
    this.auth_service.login(this.log_email, this.log_pw);
    console.log('login clicked');

  }
}

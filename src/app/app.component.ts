import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
  isCollapsed = false;
  log_email:string;
  log_pw:string;

  constructor(private auth_service: AuthService) {}

  login(){
    // Let AuthService process login authentication
    this.auth_service.login(this.log_email,this.log_pw);
  }

  ngOnInit(): void {
  }
}

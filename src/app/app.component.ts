import { NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'saladle';
  isCollapsed = false;
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
}

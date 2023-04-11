import { AuthService } from './../../../shared/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCollapsed = false;
  log_email:string;
  log_pw:string;
  showMenu: boolean = false;
  // loggedIn: boolean = false;
  currentUser: any;

  constructor(private router: Router, private authService: AuthService)  {
    console.log('alo nav');

    router.events.forEach((event)=>{
      if(event instanceof NavigationStart) {
        this.showMenu = event.url !== "/login";
      }
    });

  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  async getCurrentUser() {
    this.currentUser = await this.authService.currentUser;
    console.log('co lay duoc du lieu khong');

    console.log(this.currentUser);
  }

}

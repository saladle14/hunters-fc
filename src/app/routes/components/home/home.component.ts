import { HomeDrawerComponent } from './partials/home-drawer/home-drawer.component';
import { UserService } from './../../../services/user/user.service';
import { MatchService } from './../../../services/match/match.service';
import { AuthService, Role } from './../../../shared/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

export enum DeviceType {
  MOBILE,
  TABLE,
  PC,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class HomeComponent implements OnInit {
  @ViewChild('homeDrawer') homeDrawer!: HomeDrawerComponent;
  allUsers: any;
  currentUser: any;
  allMatches: any;
  // listMember = [];
  allListMember = [];
  // currentMatchMember = [];
  visibleDetailMatchDrawer = false;
  isDashboard: boolean;
  currentDeviceType: DeviceType;
  DeviceType = DeviceType;

  mobileNavVisible: boolean = false;
  limitedUser: any[] = [];

  constructor(
    private authService: AuthService,
    private matchService: MatchService,
    private userService: UserService,
    private message: NzMessageService
  ) {
    this.currentUser = authService.getCurrentUser();
    this.getCurrentDeviceType();
    // this.currentUser = { fullName: 'huy', avatar: 'huy', coin: '12' };
  }

  ngOnInit(): void {
    this.fetchData();
  }

  isAdmin() {
    return this.authService.role == Role.Admin;
  }

  getCurrentDeviceType() {
    if (window.innerWidth > 1024) {
      this.currentDeviceType = DeviceType.PC;
    } else if (window.innerWidth > 740) {
      this.currentDeviceType = DeviceType.TABLE;
    } else {
      this.currentDeviceType = DeviceType.MOBILE;
    }
  }

  async fetchData() { }

  openDetailMatchDrawer(): void {
    this.visibleDetailMatchDrawer = true;
  }

  closeDetailMatchDrawer(): void {
    this.visibleDetailMatchDrawer = false;
  }

  onCloseDrawer(ev: any) { }

  createBasicMessage(): void {
    this.message.info('Chức năng đang phát triển');
  }

  onClickLogOut() {
    localStorage.removeItem('currentUser');
  }

  onResize(event: any) {
    // if (event.target.innerWidth < 1474) {
    // } else {
    // }
    this.getCurrentDeviceType();
  }

  openMobileNavDrawer() {
    this.mobileNavVisible = true;
  }

  closeMobileNavDrawer() {
    this.mobileNavVisible = false;
  }
}

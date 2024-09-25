import { DeviceType } from './../../home.component';
import { AuthService } from './../../../../../shared/auth.service';
import { MatchService } from './../../../../../services/match/match.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TelegramService } from 'src/app/services/telegram/telegram.service';

@Component({
  selector: 'app-home-drawer',
  templateUrl: './home-drawer.component.html',
  styleUrls: ['./home-drawer.component.css'],
})
export class HomeDrawerComponent implements OnInit {
  mode!: string;
  isVisibleDrawer: boolean = false;
  isEdit: boolean = false;
  titleDrawer: string = '';
  thisMatch: any;
  thisMatchAttendMem: any[];
  thisMatchDenyMem: any[];
  listAttendMembers = [];
  listDenyMembers = [];
  currentUser: any;
  currentDeviceType: DeviceType;
  DeviceType = DeviceType;
  drawerWidth: string = '40%';

  @Output() onCloseDrawer = new EventEmitter();

  constructor(
    private authService: AuthService,
    private matchService: MatchService,
    private telegramService: TelegramService
  ) {
    this.currentUser = authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getCurrentDeviceType();
  }

  async openDrawer(
    data: any,
    mode: string,
    isEdit: boolean,
    listAttendMember: any,
    listDenyMember: any
  ) {
    this.isVisibleDrawer = true;
    this.mode = mode;
    this.isEdit = isEdit;
    this.listAttendMembers = listAttendMember;
    this.listDenyMembers = listDenyMember;
    this.thisMatch = await data;
    this.titleDrawer =
      `Kèo ${this.getTimeSection(data.day)} ${this.getTimeWeekDay(data.day)} ${data.stadium}`;
    // this.editForm.reset();

    // if (this.mode === 'create') {
    //   this.editForm.enable();
    //   this.titleDrawer = this.translate('layout.header.title.add');
    //   this.editForm.patchValue(data);
    // } else if (this.mode === 'detail') {
    //   let response = await this.baseOrganizationService.getSysAplicationById(data.id).toPromise();
    //   if (response.code === RESPONSE_STATUS_CODES[200]) {
    //     this.editForm.patchValue(response.data);
    //   }
    //   this.checkEditForm();
    // }
  }

  getCurrentDeviceType() {
    if (window.innerWidth > 1024) {
      this.currentDeviceType = DeviceType.PC;
    } else if (window.innerWidth > 740) {
      this.currentDeviceType = DeviceType.TABLE;
    } else {
      this.currentDeviceType = DeviceType.MOBILE;
      this.drawerWidth = '100%';
    }
  }

  closeDrawer() {
    this.onCloseDrawer.emit((this.isVisibleDrawer = false));
  }

  async updateMatchAttendMember(data: any) {
    var editingData = Object.assign({}, data);
    if (
      editingData.denyMemberObj.includes(this.currentUser.id) == false &&
      editingData.attendMemberObj.includes(this.currentUser.id) == false
    ) {
      editingData.attendMemberObj.push(this.currentUser.id);
      this.matchService
        .updateMatch(data.id, editingData)
        .subscribe((result) => {});
    }
    let message = `<b>${this.currentUser.fullName}</b> đã bình chọn CÓ ĐÁ.%0ASố người đá hiện tại là ${editingData.attendMemberObj.length} người`;
    this.telegramService
      .sendMessage('5426764053', message)
      .toPromise()
      .then((res) => {});
  }

  async updateMatchDenyMember(data: any) {
    var editingData = Object.assign({}, data);
    if (
      editingData.denyMemberObj.includes(this.currentUser.id) == false &&
      editingData.attendMemberObj.includes(this.currentUser.id) == false
    ) {
      editingData.denyMemberObj.push(this.currentUser.id);
      this.matchService
        .updateMatch(data.id, editingData)
        .subscribe((result) => {});
    }
    let message = `<b>${this.currentUser.fullName}</b> đã bình chọn KHÔNG ĐÁ.%0ASố người đá hiện tại là ${editingData.attendMemberObj.length} người`;
    this.telegramService
      .sendMessage('5426764053', message)
      .toPromise()
      .then((res) => {});
  }

  getTimeWeekDay(date: Date): string {
    const fullDate = new Date(date);
    var weekDay: string;
    switch (fullDate.getDay()) {
      case 0: {
        weekDay = 'Chủ Nhật';
        break;
      }
      case 1: {
        weekDay = 'Thứ Hai';
        break;
      }
      case 2: {
        weekDay = 'Thứ Ba';
        break;
      }
      case 3: {
        weekDay = 'Thứ Tư';
        break;
      }
      case 4: {
        weekDay = 'Thứ Năm';
        break;
      }
      case 5: {
        weekDay = 'Thứ Sáu';
        break;
      }
      case 6: {
        weekDay = 'Thứ Bảy';
        break;
      }
      default: {
        weekDay = 'Chủ Nhật';
        break;
      }
    }
    return weekDay;
  }

  getTimeSection(date: Date): string {
    const fullDate = new Date(date);
    var hour = fullDate.getHours();
    var session: string;
    if (hour <= 11) {
      session = 'Sáng';
    } else if (hour >= 19) {
      session = 'Tối';
    } else {
      session = 'Chiều';
    }

    return session;
  }
}

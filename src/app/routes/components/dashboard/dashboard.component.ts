import { element } from 'protractor';
import { HomeDrawerComponent } from './../home/partials/home-drawer/home-drawer.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from './../../../services/user/user.service';
import { MatchService } from './../../../services/match/match.service';
import { AuthService } from './../../../shared/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VoteStatus } from '../admin/list-match/match-detail-drawer/match-detail-drawer.component';
import { TelegramService } from 'src/app/services/telegram/telegram.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('homeDrawer') homeDrawer!: HomeDrawerComponent;
  allUsers: any;
  currentUser: any;
  allMatches: any;
  // listMember = [];
  allListAttendMember = [];
  allListDenyMember = [];
  // currentMatchMember = [];
  visibleDetailMatchDrawer = false;
  isDashboard: boolean;
  popoverVisible: boolean = false;
  editingMatch: any;
  editingToVoteStatus: VoteStatus;
  // ------ Vote Action ------
  isVisibleChangeVoteModal: boolean = false;
  confirmChangeVoteMessage: string = 'loading...';
  limitedUser: any[] = [];

  constructor(
    private authService: AuthService,
    private matchService: MatchService,
    private userService: UserService,
    private message: NzMessageService,
    private telegramService: TelegramService
  ) {
    this.currentUser = authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    await this.getAllMatches();
    await this.getAllUsers();
    for (let i = 0; i < Object.keys(this.allMatches).length; i++) {
      this.getAttendMemberList(this.allMatches[i].id);
      this.getDenyMemberList(this.allMatches[i].id);
    }
  }

  async getAllMatches() {
    var response = await this.matchService.getAllMatches().toPromise();
    // var allListMatches: any = response;
    // allListMatches.forEach((match: any) => {
    //   if (match.isVoting) {
    //     this.allMatches.push(match);
    //   }
    // });

    this.allMatches = response;
  }

  async getAllUsers() {
    var response = await this.userService.getAllUsers().toPromise();
    this.allUsers = response;
  }

  async getAttendMemberList(matchId: any) {
    var currentMatchMember = [];
    var response = await this.matchService.getMatchById(matchId).toPromise();
    var match = response;

    match['attendMemberObj'].forEach((matchElement: any) => {
      this.allUsers.forEach((userElement: any) => {
        if (matchElement == userElement.id) {
          currentMatchMember.push(userElement);
        }
      });
    });

    // this.allUsers.forEach((elementUser) => {
    //   match['attendMemberObj'].forEach((elementMatchMember: any) => {
    //     if (elementMatchMember === elementUser.id) {
    //       currentMatchMember.push(elementUser.fullName);
    //       // var listMember = [];
    //       // this.allListMember[id].push(elementUser.fullName);
    //       // Object.keys(this.allListMember[id]).push(elementUser.fullName);
    //     }
    //   });
    // });
    this.allListAttendMember[matchId] = currentMatchMember;
  }

  async getDenyMemberList(id: any) {
    var currentMatchMember = [];
    var response = await this.matchService.getMatchById(id).toPromise();
    var match = response;

    match['denyMemberObj'].forEach((matchElement: any) => {
      this.allUsers.forEach((userElement: any) => {
        if (matchElement == userElement.id) {
          currentMatchMember.push(userElement);
        }
      });
    });
    this.allListDenyMember[id] = currentMatchMember;
  }

  openDetailMatchDrawer(): void {
    this.visibleDetailMatchDrawer = true;
  }

  closeDetailMatchDrawer(): void {
    this.visibleDetailMatchDrawer = false;
  }

  async onClickDetail(data: any) {
    // await this.getAttendMemberList(data.id);
    // await this.getDenyMemberList(data.id);
    this.homeDrawer.openDrawer(
      data,
      'detail',
      false,
      this.allListAttendMember[data.id],
      this.allListDenyMember[data.id]
    );
  }

  onCloseDrawer(ev: any) {}

  createBasicMessage(): void {
    this.message.info('Chức năng đang phát triển');
  }

  createResponseMessage(): void {
    this.message.create('success', `Đã bình chọn thành công`);
  }

  changePopoverVisible(value: boolean): void {
    console.log(value);
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
      this.createResponseMessage();
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
      this.createResponseMessage();
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

  getMatchStatusTooltipTitle(memberNumber: number) {
    if (memberNumber < 7) {
      return 'Chưa đủ đá';
    } else if (memberNumber >= 7 && memberNumber < 14) {
      return 'Đã đủ đá đối';
    } else {
      return 'Chốt đá với nhau';
    }
  }

  getMatchStatusTooltipColor(memberNumber: number) {
    if (memberNumber < 7) {
      return 'red';
    } else if (memberNumber >= 7 && memberNumber < 14) {
      return 'orange';
    } else {
      return 'cyan';
    }
  }

  // ------ Vote Action ------
  onClickChangeVote(data: any) {
    this.editingMatch = data;
    var isAttending = data.attendMemberObj.includes(this.currentUser.id);
    this.editingToVoteStatus = isAttending ? VoteStatus.No : VoteStatus.Yes;
    this.isVisibleChangeVoteModal = true;
    if (isAttending)
      this.confirmChangeVoteMessage = `Bạn có chắc chắn muốn chuyển vote trận đấu thành KHÔNG ĐÁ?
        <br>
        <b>Các đồng đội sẽ buồn đó 🙁 </b>`;
    else
      this.confirmChangeVoteMessage =
        'Bạn có chắc chắn muốn chuyển vote trận đấu thành CÓ ĐÁ? 😁';
  }

  hideChangeVoteModal() {
    this.isVisibleChangeVoteModal = false;
  }

  onConfirmChangeVote() {}

  async changeVote() {
    let messageStatus = '';
    var editingData = Object.assign({}, this.editingMatch);
    if (this.editingToVoteStatus == VoteStatus.Yes) {
      const index = editingData.denyMemberObj.indexOf(this.currentUser.id, 0);
      if (index > -1) editingData.denyMemberObj.splice(index, 1);
      editingData.attendMemberObj.push(this.currentUser.id);
      messageStatus = 'Không đá thành CÓ ĐÁ';
    } else if (this.editingToVoteStatus == VoteStatus.No) {
      const index = editingData.attendMemberObj.indexOf(this.currentUser.id, 0);
      if (index > -1) editingData.attendMemberObj.splice(index, 1);
      editingData.denyMemberObj.push(this.currentUser.id);
      messageStatus = 'Có đá thành KHÔNG ĐÁ';
    }
    this.matchService
      .updateMatch(this.editingMatch.id, editingData)
      .subscribe(async (result) => {
        await this.fetchData();
        this.isVisibleChangeVoteModal = false;
        this.message.info('Thay đổi vote thành công');
      });
    let message = `<b>${this.currentUser.fullName}</b> đã đổi bình chọn ${messageStatus}.%0ASố người đá hiện tại là ${editingData.attendMemberObj.length} người`;
    this.telegramService
      .sendMessage('5426764053', message)
      .toPromise()
      .then((res) => {});
  }
}

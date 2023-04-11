import { UserService } from './../../../../services/user/user.service';
import { MatchDetailDrawerComponent } from './match-detail-drawer/match-detail-drawer.component';
import { MatchService } from './../../../../services/match/match.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-list-match',
  templateUrl: './list-match.component.html',
  styleUrls: ['./list-match.component.css'],
})
export class ListMatchComponent implements OnInit {
  @ViewChild('matchDetailDrawer')
  matchDetailDrawer!: MatchDetailDrawerComponent;
  allMatches: any;
  allUsers: any;
  currentMatch: any;
  visible = false;

  constructor(
    private matchService: MatchService,
    private userService: UserService,
    private nzContextMenuService: NzContextMenuService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getListUsers();
    this.fetchData();
  }

  async fetchData() {
    await this.getListMatch();
  }

  async getListMatch() {
    var response = await this.matchService.getAllMatches().toPromise();
    this.allMatches = response;
  }

  async getListUsers() {
    var response = await this.userService.getAllUsers().toPromise();
    this.allUsers = response;
  }

  // Drawer
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  async onClickCreate(data?: any) {
    this.matchDetailDrawer.openDrawer(data, 'create', false, this.allUsers);
  }

  async onClickDetail(data: any) {
    this.matchDetailDrawer.openDrawer(data, 'detail', false, this.allUsers);
  }

  async onClickDeleteMatch(deleteId: any) {
    await this.matchService
      .deleteMatch(deleteId)
      .toPromise()
      .then((res) => {
        console.log(res);
        debugger;

        this.fetchData();
      });
  }

  onCloseDrawer(ev: any) {}

  contextMenu(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
    match: any
  ): void {
    this.nzContextMenuService.create($event, menu);
    this.currentMatch = match;
  }

  getSqlCode(data: any) {
    var listJoinMemberCode = [];
    data.attendMemberObj.forEach((playerId: any) => {
      listJoinMemberCode.push(
        "'" + this.allUsers.find((item) => item.id == playerId).code + "'"
      );
    });
    var listJoinMemberCodeString = listJoinMemberCode.join(', ');
    this.copyMessage(listJoinMemberCodeString);
    debugger;
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

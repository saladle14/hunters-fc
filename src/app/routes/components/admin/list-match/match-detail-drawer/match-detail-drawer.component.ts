import { MatchService } from './../../../../../services/match/match.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { getISOWeek } from 'date-fns';

interface DataItem {
  name: string;
  vote: number;
  address: string;
}

interface ColumnItem {
  name: string;
  width: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
  isShowFilter: boolean;
  isShowSort: boolean;
}

export enum VoteStatus {
  Yes = 'Có đá',
  No = 'Không đá',
  NotYet = 'Chưa vote',
}

class UserVote {
  id: string;
  name: string;
  avatarUrl: string;
  facebookLink: string;
  status: VoteStatus;
  constructor(
    id: string,
    name: string,
    avatarUrl: string,
    facebookLink: string,
    status: VoteStatus
  ) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.facebookLink = facebookLink;
    this.status = status;
  }
}

@Component({
  selector: 'app-match-detail-drawer',
  templateUrl: './match-detail-drawer.component.html',
  styleUrls: ['./match-detail-drawer.component.css'],
})
export class MatchDetailDrawerComponent implements OnInit {
  data: any;
  mode!: string;
  isEdit: boolean = false;
  isShowPotential: boolean = false;

  titleDrawer: string = '';
  isVisibleDrawer: boolean = false;
  thisMatch: any;
  allUsers: any[] = [];
  listAllUser: any[] = [];
  allAttendMember: any;
  allDenyMember: any;
  confirmVotePopupVisible: boolean = false;

  selectedDay: any;

  VoteStatus = VoteStatus;
  templateDay: string = 'Sun Jan 01 2023 14:00:00 GMT+0700';

  @Output() onCloseDrawer = new EventEmitter();

  matchDetailForm: FormGroup;

  listOfStadium: any[] = [
    'SVĐ Suối Hoa',
    'SVĐ Vệ An',
    'Đại Phúc',
    'Cung Văn Hóa',
  ];

  listOfColumns: ColumnItem[] = [
    {
      name: 'STT',
      width: '10%',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
      isShowFilter: false,
      isShowSort: false,
    },
    {
      name: 'Tên',
      width: 'auto',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [{ text: 'Huy', value: 'Huy' }],
      filterFn: (list: string[], item: DataItem) =>
        list.some((name) => item.name.indexOf(name) !== -1),
      isShowFilter: true,
      isShowSort: true,
    },
    {
      name: 'Bình chọn',
      width: '15%',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [
        { text: VoteStatus.Yes, value: VoteStatus.Yes },
        { text: VoteStatus.No, value: VoteStatus.No },
        { text: VoteStatus.NotYet, value: VoteStatus.NotYet },
        // { text: 'Chưa Vote', value: 'Chưa Vote', byDefault: true },
      ],
      filterFn: (list: any[], item: UserVote) =>
        list.some((voteStatus) => item.status.indexOf(voteStatus) !== -1),
      isShowFilter: true,
      isShowSort: false,
    },
    {
      name: 'Liên hệ',
      width: '15%',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: DataItem) =>
        list.some((name) => item.name.indexOf(name) !== -1),
      isShowFilter: false,
      isShowSort: false,
    },
    {
      name: 'Hành động',
      width: '15%',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
      isShowFilter: false,
      isShowSort: false,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.matchDetailForm = this.fb.group({
      name: [null, [Validators.required]],
      day: [null, [Validators.required]],
      stadium: [null, [Validators.required]],
      note: [null],
      isKickedOff: false,
    });
  }

  async openDrawer(data: any, mode: string, isEdit: boolean, listUsers: any) {
    this.isVisibleDrawer = true;
    this.mode = mode;
    this.isEdit = isEdit;
    this.thisMatch = data;
    this.data = data;
    this.listAllUser = listUsers;
    this.allUsers = [];
    this.matchDetailForm.reset();
    if (this.mode == 'create') {
      // this.drawerForm.enable();
      this.titleDrawer = 'Thêm trận đấu';
      if(data) {
        this.matchDetailForm.patchValue(data);
      }
    } else if (this.mode == 'detail') {
      await this.getListVoteStatusUser();
      this.getAttendMemberList();
      this.getDenyMemberList();
      // this.matchDetailForm.disable();

      this.loadDataToForm(data);
      this.titleDrawer = 'Xem trận đấu';
    }
  }

  closeDrawer() {
    this.onCloseDrawer.emit((this.isVisibleDrawer = false));
  }

  submitForm(): void {
    console.log('submit', this.matchDetailForm.value);
    this.matchService.createNewMatch(this.matchDetailForm.value).toPromise().then(result =>
      this.nzMessageService.info('Tạo trận đấu thành công')

      )
  }
  loadDataToForm(data: any) {
    // this.data = data;
    this.matchDetailForm.patchValue(data);
    console.log(this.matchDetailForm);

    // if (data.avatarUrl) {
    //   this.avatarUrl = data.avatarUrl;
    // }
  }

  onChangeMatchDay(ev: any) {
    console.log('huy: ', ev);
  }

  async getAttendMemberList() {
    var currentMatchMember = [];

    this.thisMatch['attendMemberObj'].forEach((matchElement: any) => {
      this.allUsers.forEach((userElement: any) => {
        if (matchElement == userElement.id) {
          currentMatchMember.push(userElement.id);
        }
      });
    });
    this.allAttendMember = currentMatchMember;
  }

  clickActionUser(user: any) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = user.name + ' ơi, vote kèo tuần này đi';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  async getDenyMemberList() {
    var currentMatchMember = [];

    this.thisMatch['denyMemberObj'].forEach((matchElement: any) => {
      this.allUsers.forEach((userElement: any) => {
        if (matchElement == userElement.id) {
          currentMatchMember.push(userElement.id);
        }
      });
    });
    this.allDenyMember = currentMatchMember;
  }

  async changeVote(id: string, voteStatus: VoteStatus) {
    var editingData = Object.assign({}, this.data);
    if (voteStatus == VoteStatus.Yes) {
      const index = editingData.denyMemberObj.indexOf(id, 0);
      if (index > -1) editingData.denyMemberObj.splice(index, 1);
      editingData.attendMemberObj.push(id);
    } else if (voteStatus == VoteStatus.No) {
      const index = editingData.attendMemberObj.indexOf(id, 0);
      if (index > -1) editingData.attendMemberObj.splice(index, 1);
      editingData.denyMemberObj.push(id);
    }
    this.matchService
      .updateMatch(this.data.id, editingData)
      .subscribe((result) => {
        this.data = result;
        this.nzMessageService.info('Đã cập nhật thành công');
        this.getListVoteStatusUser();
      });
  }

  async getListVoteStatusUser() {
    this.allUsers = [];
    await this.listAllUser.forEach((user: any) => {
      if (this.data.attendMemberObj.includes(user.id)) {
        this.allUsers.push(
          new UserVote(
            user.id,
            user.fullName,
            user.avatar,
            user.facebookLink,
            VoteStatus.Yes
          )
        );
      } else if (this.data.denyMemberObj.includes(user.id)) {
        this.allUsers.push(
          new UserVote(
            user.id,
            user.fullName,
            user.avatar,
            user.facebookLink,
            VoteStatus.No
          )
        );
      } else {
        this.allUsers.push(
          new UserVote(
            user.id,
            user.fullName,
            user.avatar,
            user.facebookLink,
            VoteStatus.NotYet
          )
        );
      }
    });
  }

  addMatchToStorage() {
    var storageMatch= {...this.data,id:null};
    this.matchService
      .addMatchToStorage(storageMatch)
      .toPromise()
      .then((result) => {
        this.matchService
          .deleteMatch(this.data.id)
          .toPromise()
          .then((result) => {
            this.closeDrawer();
          });
      });
  }

  onCopyTemplateDay() {
    this.matchDetailForm.controls.day.setValue(this.templateDay);
  }

  // Show potential player
  onChangeShowPotential(ev: any) {
    if(ev) {
      this.allUsers = this.listAllUser.filter(x => x.potential === true);
    } else {
      this.allUsers = this.listAllUser;
    }
  }
}

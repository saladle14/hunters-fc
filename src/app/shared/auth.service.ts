import { UserService } from './../services/user/user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export enum Role {
  Guess = 'Guess',
  User = 'User',
  Admin = 'Admin',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login_success = false;
  role: Role | any;
  usersList: any;
  currentUser: any;

  constructor(private router: Router, private userService: UserService) {
    // this.userService.getAllUsers().subscribe((response) => {
    //   this.usersList = response;
    // });
    if (localStorage.getItem('currentUser') != null) {
      this.login_success = true;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.setRole(this.currentUser.userName);
    }
    this.usersList = [
      {
        userName: 'leduchuy',
        password: 'leduchuyhahe',
        avatar: 'https://zpsocial-f43-org.zadn.vn/60997eb09845741b2d54.jpg',
        name: 'Huy',
        fullName: 'Lê Đức Huy',
        shirtNum: 7,
        coin: 66,
        id: '001',
      },
      {
        userName: 'trinhbaoanh',
        password: 'trinhbaoanh',
        avatar: 'https://zpsocial-f47-org.zadn.vn/79963badc89827c67e89.jpg',
        name: 'Banh',
        fullName: 'Trịnh Bảo Anh',
        shirtNum: 14,
        coin: 0,
        id: '002',
      },
      {
        userName: 'vuvietdung',
        password: 'vuvietdung',
        avatar: 'https://i.postimg.cc/Z5wQKJmh/fchunters.png',
        name: 'Dũng',
        fullName: 'Vũ Việt Dũng',
        shirtNum: 77,
        coin: 0,
        id: '003',
      },
      {
        userName: 'nguyenduchai',
        password: 'nguyenduchai',
        avatar: 'avatar 4',
        name: 'Hải',
        fullName: 'Nguyễn Đức Hải ',
        shirtNum: 3,
        coin: 0,
        id: '004',
      },
      {
        userName: 'nguyenviethuy',
        password: 'nguyenviethuy',
        avatar: 'https://f32-org-zp.zdn.vn/98aba619ba9b50c5098a.jpg',
        name: 'Huy',
        fullName: 'Nguyễn Việt Huy',
        shirtNum: 44,
        coin: 0,
        id: '005',
      },
      {
        userName: 'nguyenhuuhung',
        password: 'nguyenhuuhung',
        avatar: 'https://zpsocial-f47-org.zadn.vn/ed63881f9a53750d2c42.jpg',
        name: 'Hưng',
        fullName: 'Nguyễn Hữu Hưng',
        shirtNum: 49,
        coin: 0,
        id: '006',
      },
      {
        userName: 'ngoquanghung',
        password: 'ngoquanghung',
        avatar: 'avatar 6',
        name: 'Hưng',
        fullName: 'Ngô Quang Hưng',
        shirtNum: 49,
        coin: 0,
        id: '007',
      },
      {
        userName: 'nguyensykhai',
        password: 'nguyensykhai',
        avatar: 'https://zpsocial-f50-org.zadn.vn/03c3edafb8a256fc0fb3.jpg',
        name: 'Khải',
        fullName: 'Nguyễn Sỹ Khải',
        shirtNum: 49,
        coin: 0,
        id: '008',
      },
      {
        userName: 'phanngockhanh',
        password: 'phanngockhanh',
        avatar: 'https://zpsocial-f43-org.zadn.vn/ca6d46e70d91e1cfb880.jpg',
        name: 'Khánh',
        fullName: 'Phan Ngọc Khánh',
        shirtNum: 49,
        coin: 0,
        id: '009',
      },
      {
        userName: 'hoangngockien',
        password: 'hoangngockien',
        avatar: 'https://zpsocial-f35-org.zadn.vn/e99202d79ba776f92fb6.jpg',
        name: 'Kiên',
        fullName: 'Hoàng Ngọc Kiên',
        shirtNum: 49,
        coin: 0,
        id: '010',
      },
      {
        userName: 'nguyentrungkien',
        password: 'nguyentrungkien',
        avatar: 'https://zpsocial-f52-org.zadn.vn/1558fd225922b77cee33.jpg',
        name: 'Kiên',
        fullName: 'Nguyễn Trung Kiên',
        shirtNum: 49,
        coin: 0,
        id: '011',
      },
      {
        userName: 'trinhtrungkien',
        password: 'trinhtrungkien',
        avatar: 'https://zpsocial-f46-org.zadn.vn/8323f503b1585e060749.jpg',
        name: 'Kiên',
        fullName: 'Trịnh Trung Kiên',
        shirtNum: 49,
        coin: 0,
        id: '012',
      },
      {
        userName: 'nguyenhailong',
        password: 'nguyenhailong',
        avatar: 'https://f34-org-zp.zdn.vn/6211725ca6314b6f1220.jpg',
        name: 'Long',
        fullName: 'Nguyễn Hải Long',
        shirtNum: 49,
        coin: 0,
        id: '013',
      },
      {
        userName: 'nguyengianglong',
        password: 'nguyengianglong',
        avatar: 'avatar 6',
        name: 'Long',
        fullName: 'Nguyễn Giang Long',
        shirtNum: 49,
        coin: 0,
        id: '014',
      },
      {
        userName: 'nguyenducloc',
        password: 'nguyenducloc',
        avatar: 'https://f34-org-zp.zdn.vn/32acb6eb1b44f11aa855.jpg',
        name: 'Lộc',
        fullName: 'Nguyễn Đức Lộc',
        shirtNum: 49,
        coin: 0,
        id: '015',
      },
      {
        userName: 'nguyenquangminh',
        password: 'nguyenquangminh',
        avatar: 'avatar 6',
        name: 'Minh',
        fullName: 'Nguyễn Quang Minh',
        shirtNum: 49,
        coin: 0,
        id: '016',
      },
      {
        userName: 'nguyenminhnhat',
        password: 'nguyenminhnhat',
        avatar: 'https://zpsocial-f40-org.zadn.vn/0eaa5a058911654f3c00.jpg',
        name: 'Nhật',
        fullName: 'Nguyễn Minh Nhật',
        shirtNum: 49,
        coin: 0,
        id: '017',
      },
      {
        userName: 'nguyendangninh',
        password: 'nguyendangninh',
        avatar: 'avatar 6',
        name: 'Ninh',
        fullName: 'Nguyễn Đăng Ninh',
        shirtNum: 49,
        coin: 0,
        id: '018',
      },
      {
        userName: 'nguyenhoangphuc',
        password: 'nguyenhoangphuc',
        avatar: 'https://zpsocial-f48-org.zadn.vn/229ef5f469be86e0dfaf.jpg',
        name: 'Phúc',
        fullName: 'Nguyễn Hoàng Phúc',
        shirtNum: 49,
        coin: 0,
        id: '019',
      },
      {
        userName: 'daominhquan',
        password: 'daominhquan',
        avatar: 'https://zpsocial-f47-org.zadn.vn/762c42fd7d6e9230cb7f.jpg',
        name: 'Quân',
        fullName: 'Đào Minh Quân',
        shirtNum: 49,
        coin: 0,
        id: '020',
      },
      {
        userName: 'nguyendinhtan',
        password: 'nguyendinhtan',
        avatar: 'https://zpsocial-f43-org.zadn.vn/e446e30b0c9fe1c1b88e.jpg',
        name: 'Tân',
        fullName: 'Nguyễn Đình Tân',
        shirtNum: 49,
        coin: 0,
        id: '021',
      },
      {
        userName: 'nguyentuanthanh',
        password: 'nguyentuanthanh',
        avatar: 'avatar 6',
        name: 'Thành',
        fullName: 'Nguyễn Tuấn Thành',
        shirtNum: 49,
        coin: 0,
        id: '022',
      },
      {
        userName: 'nguyenducthuan',
        password: 'nguyenducthuan',
        avatar: 'https://zpsocial-f46-org.zadn.vn/78473826d8ae34f06dbf.jpg',
        name: 'Thuận',
        fullName: 'Nguyễn Đức Thuận',
        shirtNum: 49,
        coin: 0,
        id: '023',
      },
      {
        userName: 'nguyenquangnhattruong',
        password: 'nguyenquangnhattruong',
        avatar: 'avatar 6',
        name: 'Trường',
        fullName: 'Nguyễn Quang Nhật Trường',
        shirtNum: 49,
        coin: 0,
        id: '024',
      },
      {
        userName: 'nguyenminhtuan',
        password: 'nguyenminhtuan',
        avatar: 'https://zpsocial-f47-org.zadn.vn/72ed2ebeec6f03315a7e.jpg',
        name: 'Tuấn',
        fullName: 'Nguyễn Minh Tuấn',
        shirtNum: 49,
        coin: 0,
        id: '025',
      },
      {
        userName: 'thaiminhtuan',
        password: 'thaiminhtuan',
        avatar: 'avatar 6',
        name: 'Tuấn',
        fullName: 'Thái Minh Tuấn',
        shirtNum: 49,
        coin: 0,
        id: '026',
      },
      {
        userName: 'luongthevinh',
        password: 'luongthevinh',
        avatar: 'avatar 6',
        name: 'Vinh',
        fullName: 'Lương Thế Vinh',
        shirtNum: 49,
        coin: 0,
        id: '027',
      },
      {
        userName: 'nguyentuan',
        password: 'nguyentuan',
        avatar: 'avatar 6',
        name: 'Tuân',
        fullName: 'Nguyễn Tuân',
        shirtNum: 49,
        coin: 0,
        id: '028',
      },
      {
        userName: 'nguyenminhhieu',
        password: 'nguyenminhhieu',
        avatar: 'avatar 6',
        name: 'Hiếu',
        fullName: 'Nguyễn Minh Hiếu',
        shirtNum: 99,
        coin: 0,
        id: '029',
      },
      {
        userName: 'ngotuanthanh',
        password: 'ngotuanthanh',
        avatar: 'avatar 6',
        name: 'Thành',
        fullName: 'Ngô Tuấn Thành',
        shirtNum: 49,
        coin: 0,
        id: '030',
      },
      {
        userName: 'nguyenthanhcong',
        password: 'nguyenthanhcong',
        avatar: 'avatar 6',
        name: 'Công',
        fullName: 'Nguyễn Thành Công',
        shirtNum: 49,
        coin: 0,
        id: '031',
      },
      {
        userName: 'nguyentienmanh',
        password: 'nguyentienmanh',
        avatar: 'avatar 6',
        name: 'Mạnh',
        fullName: 'Nguyễn Tiến Mạnh',
        shirtNum: 49,
        coin: 0,
        id: '032',
      },
      {
        userName: 'phamthanhhung',
        password: 'phamthanhhung',
        avatar: 'avatar 6',
        name: 'Hưng',
        fullName: 'Phạm Thành Hưng',
        shirtNum: 49,
        coin: 0,
        id: '033',
      },
      {
        userName: 'nguyentrunghieu',
        password: 'nguyentrunghieu',
        avatar: 'avatar 6',
        name: 'Hiếu',
        fullName: 'Nguyễn Trung Hiếu',
        shirtNum: 95,
        coin: 0,
        id: '034',
      }
    ];
  }

  setCurrentUser(data: any) {
    this.currentUser = data;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login(log_username: string, log_password: string) {
    Object.keys(this.usersList).forEach((element) => {
      if (this.usersList[element].userName === log_username) {
        if (this.usersList[element].password === log_password) {
          this.login_success = true;
          this.role = Role.User;
          this.currentUser = this.usersList[element];
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.setRole(log_username);
        } else {
          this.login_success = false;
        }
        this.router.navigate(['/home/dashboard']);
      }
    });
  }

  logout() {
    this.router.navigate(['']);
  }

  isAuthenticated() {
    // return true if the user enter correct user name and password
    return this.login_success;
  }

  setRole(username) {
    if (username == 'leduchuy' || username == 'nguyentrungkien') {
      this.role = Role.Admin;
    } else {
      this.role = Role.User;
    }
  }
}

import { AuthService } from './../../../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixture-result',
  templateUrl: './fixture-result.component.html',
  styleUrls: ['./fixture-result.component.css'],
})
export class FixtureResultComponent implements OnInit {
  currentUser: any;
  constructor(private authService: AuthService) {
    this.currentUser = authService.currentUser;
  }

  ngOnInit(): void {}

  tabs = [
    {
      name: 'Tất cả',
      icon: 'unordered-list',
    },
    {
      name: 'Giao hữu',
      icon: 'unordered-list',
    },
  ];

  panels = [
    {
      active: false,
      team1: 'Fc. Hunters',
      logo1: 'https://i.postimg.cc/8zV5L91p/Hunters.png',
      goal1: '7',
      goal2: '7',
      team2: 'Fc Gia Bình',
      disabled: false,
    },
  ];

  listMatches = [
    {
      time: '13/09/2022',
      league: 'Hunters Friendly Match Hanoi',
      stadium: 'SVĐ Phường Lĩnh Nam (Sân Thúy Lĩnh)',
      team1: 'Fc Công ty Khải',
      logo1:
        'https://assets.manutd.com/AssetPicker/images/0/0/11/201/772402/Manchester_United_Crest_Comp_180x1801550591475296.png',
      goal1: '8',
      goal2: '6',
      logo2: 'https://i.postimg.cc/8zV5L91p/Hunters.png',
      team2: 'Fc. Hunters',
      panelActive: false,
      panelDisabled: false,
    },
    {
      time: '03/09/2022',
      league: 'Hunters Friendly Match',
      stadium: 'SVĐ Suối Hoa',
      team1: 'Fc. Hunters',
      logo1: 'https://i.postimg.cc/8zV5L91p/Hunters.png',
      goal1: '7',
      goal2: '7',
      logo2:
        'https://assets.manutd.com/AssetPicker/images/0/0/11/201/772402/Manchester_United_Crest_Comp_180x1801550591475296.png',
      team2: 'Fc Gia Bình',
      panelActive: false,
      panelDisabled: false,
    },
    {
      time: '20/08/2022',
      league: 'Hunters Friendly Match',
      team1: 'Fc. Hunters',
      goal1: '4',
      goal2: '4',
      team2: 'Fc Bạn Hải',
      panelActive: false,
      panelDisabled: false,
    },
  ];
}

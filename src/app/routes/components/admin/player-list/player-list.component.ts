import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from 'src/app/models/player';
import { UserService } from 'src/app/services/user/user.service';
import { PlayerDrawerComponent } from './partials/player-drawer/player-drawer.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit {
  @ViewChild('playerDrawer') playerDrawer!: PlayerDrawerComponent;

  listOfUser: Player[] = [];
  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData() {
    await this.getListPlayer();
  }

  async getListPlayer() {
    await this.userService
      .getAllUsers()
      .toPromise()
      .then((response) => {
        this.listOfUser = response;
      });
  }
}

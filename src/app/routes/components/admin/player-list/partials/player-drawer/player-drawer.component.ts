import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-drawer',
  templateUrl: './player-drawer.component.html',
  styleUrls: ['./player-drawer.component.css']
})
export class PlayerDrawerComponent implements OnInit {
  isVisibleDrawer: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  closeDrawer() {
    this.isVisibleDrawer = false;
  }

}

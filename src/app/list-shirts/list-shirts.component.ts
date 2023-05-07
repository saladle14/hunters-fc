import { ShirtService } from '../services/shirt/shirt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-shirts',
  templateUrl: './list-shirts.component.html',
  styleUrls: ['./list-shirts.component.css']
})
export class ListShirtsComponent implements OnInit {
  shirts :any;
  isLoading = false;

  constructor(private shirt: ShirtService) {
    console.log("test test test");
  }

  ngOnInit(): void {
    this.shirt.getList().subscribe((response)=> {
      this.shirts=response;
    });
  }

}

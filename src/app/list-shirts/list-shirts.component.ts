import { ShirtService } from './../shirt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-shirts',
  templateUrl: './list-shirts.component.html',
  styleUrls: ['./list-shirts.component.css']
})
export class ListShirtsComponent implements OnInit {
  shirts :any;

  constructor(private shirt: ShirtService) { }

  ngOnInit(): void {
    this.shirt.getList().subscribe((response)=> {
      this.shirts=response;
    });
  }

}

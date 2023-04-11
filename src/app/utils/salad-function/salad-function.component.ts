import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salad-function',
  templateUrl: './salad-function.component.html',
  styleUrls: ['./salad-function.component.css'],
})
export class SaladFunctionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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

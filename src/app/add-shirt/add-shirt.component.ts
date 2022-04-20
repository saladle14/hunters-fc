import { ShirtService } from './../shirt.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { differenceInCalendarDays, setHours } from 'date-fns';

@Component({
  selector: 'app-add-shirt',
  templateUrl: './add-shirt.component.html',
  styleUrls: ['./add-shirt.component.css']
})
export class AddShirtComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  title = 'Input a number';
  isShirtNumberExist: boolean = false;
  addShirtForm!: FormGroup;
  inputShirtNumber = '';
  existedError: boolean = false;
  shirts :any;
  clickedCheck: boolean = false;
  isDisableSubmit: boolean = false;

  today = new Date();

  constructor(
    private shirt: ShirtService,
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {
    this.addShirtForm = this.fb.group({
      userName: [null, [Validators.required]],
      // id: [null, [Validators.required], [this.shirtNumberValidator]],
      id: [null],
      shirtSize: [null, [Validators.required]],
      shirtName: [null],
      payDate: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.shirt.getList().subscribe((response)=> {
      console.warn(this.inputShirtNumber);
      this.shirts=response;
    });
  }

  submitForm() {
    for (const i in this.addShirtForm.controls) {
      this.addShirtForm.controls[i].markAsDirty();
      this.addShirtForm.controls[i].updateValueAndValidity();
    }
    console.warn('submited' + this.addShirtForm.value);
    if (this.addShirtForm.valid) {
      this.shirt.addShirt(this.addShirtForm.value).subscribe((result) => {
        this.createMessage('success');
        this.addShirtForm.reset({});
      });
    }
  }

  createMessage(type: string): void {
    this.message.create(type, `Gửi đăng ký thành công`);
  }

  clickCheck() {
    this.clickedCheck = true;
  }

  checkExistedShirtNumber(id: string) {
    const existedNum = this.shirts.find((x: { id: string; }) => x.id === id);
    if (existedNum !== null && existedNum !== undefined) {
      this.isShirtNumberExist = true;
      this.isDisableSubmit = true;
    } else {
      this.isShirtNumberExist = false;
      this.isDisableSubmit = false;
    }

  }

  onBlur(): void {
    if (this.inputShirtNumber.charAt(this.inputShirtNumber.length - 1) === '.' || this.inputShirtNumber === '-') {
      this.updateValue(this.inputShirtNumber.slice(0, -1));
    }
  }

  formatNumber(value: string): any {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }

  onChange(value: string): void {
    this.updateValue(value);
    this.checkExistedShirtNumber(this.inputShirtNumber);
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.inputShirtNumber = value;
    }
    this.inputElement!.nativeElement.value = this.inputShirtNumber;
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

}

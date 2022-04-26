import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements ControlValueAccessor {
    @Input() pageSize!: number;
    @Input() pageIndex!: number;
    @Input() total!: number;
    @Input() size: any = 'small';
    @Output() pageIndexChange = new EventEmitter();

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
  nzPageIndexChange(value: any): void {
    this.pageIndexChange.emit(value);
  }

}

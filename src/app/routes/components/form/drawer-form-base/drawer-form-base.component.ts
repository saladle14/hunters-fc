import { Component, Input, OnInit, Output, TemplateRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drawer-form-base',
  templateUrl: './drawer-form-base.component.html',
  styleUrls: ['./drawer-form-base.component.css']
})
export class DrawerFormBaseComponent implements OnInit {
  @Input() isClosable: boolean = true;
  @Input() isVisible: boolean = false;
  @Input() placement: string = 'right';
  @Input() title: string = '';
  @Input() closeIconTpl: string | TemplateRef<void> | null = null;
  @Input() width: string = '300px';

  @Input() mode: string = 'detail';
  @Input() isCustomFooter: boolean = false;
  @Input() customFooterTpl: string | TemplateRef<void> | null = null;


  @Input() isEdit: boolean = false;


  @Output() onCloseDrawer = new EventEmitter();
  @Output() onChangeEdit = new EventEmitter();



  constructor() { }

  ngOnInit(): void {
  }

  closeDrawer(ev?: any) {
    this.onCloseDrawer.emit((this.isVisible = false));
    this.onChangeEdit.emit((this.isEdit = false));
  }
}

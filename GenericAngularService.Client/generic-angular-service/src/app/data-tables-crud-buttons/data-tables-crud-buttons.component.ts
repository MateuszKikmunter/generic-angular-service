import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Action } from './../common/action.enum';

@Component({
  selector: 'app-data-tables-crud-buttons',
  templateUrl: './data-tables-crud-buttons.component.html',
  styleUrls: ['./data-tables-crud-buttons.component.scss']
})
export class DataTablesCrudButtonsComponent implements OnInit {

  @Input() selectedItem: any;
  @Input() showButtonText: string;

  @Output() dtEdit = new EventEmitter<Action>();

  constructor() { }

  ngOnInit() {
  }

  public onShow(): void {
    this.dtEdit.emit(Action.VIEW);
  }

  public onCreate(): void {
    this.dtEdit.emit(Action.ADD);
  }

  public onEdit(): void {
    this.dtEdit.emit(Action.EDIT);
  }

  public onDelete(): void {
    this.dtEdit.emit(Action.DELETE);
  }
}

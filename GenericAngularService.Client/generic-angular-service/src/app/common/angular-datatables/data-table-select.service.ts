import { BaseEntity } from '../base.entity';
import { Injectable } from '@angular/core';

@Injectable()
export class DataTableSelect {
  public selectedItem: BaseEntity = null;

  public selectRow(item: BaseEntity): void {
    this.selectedItem = this.rowSelected(item) ? null : item;
  }

  public rowSelected(item: BaseEntity): boolean {
    if (this.selectedItem && item) {
      return this.selectedItem.id === item.id;
    }
  }

  public clearRowSelection(): void {
    this.selectedItem = null;
  }
}

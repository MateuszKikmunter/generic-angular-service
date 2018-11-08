import { Injectable } from '@angular/core';

import { isEqual } from "lodash";

@Injectable({
  providedIn: "root"
})
export class DataTableSelect<T> {
  public selectedItem: T = null;

  public selectRow(item: T): void {
    this.selectedItem = this.rowSelected(item) ? null : item;
  }

  public rowSelected(item: T): boolean {
    if (this.selectedItem && item) {
      return isEqual(item, this.selectedItem);
    }
  }

  public clearRowSelection(): void {
    this.selectedItem = null;
  }
}

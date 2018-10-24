import { Injectable } from '@angular/core';

@Injectable()
export class DataTableSelect {
  private selectedEntity: any = null;

  public selectRow(entity: any, propertyToCompare: any): void {
    this.selectedEntity = this.rowSelected(entity, propertyToCompare) ? null : entity;
  }

  public rowSelected(entity: any, propertyToCompare: any): boolean {
    if (this.selectedEntity) {
      return this.selectedEntity[propertyToCompare] === entity[propertyToCompare];
    }
  }

  public clearRowSelection(): void {
    this.selectedEntity = null;
  }

  public validateRowSelection(): boolean {
    if (this.selectedEntity === null) {
      alert("Please select on grid first!");
      return false;
    }

    return true;
  }

  public currentRow(): any {
    return this.selectedEntity;
  }
}

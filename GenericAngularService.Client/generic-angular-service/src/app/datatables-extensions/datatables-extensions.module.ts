import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesCrudButtonsComponent } from './data-tables-crud-buttons/data-tables-crud-buttons.component';
import { DataTableSelect } from './common/data-table-select.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataTablesCrudButtonsComponent
  ],
  providers: [
    DataTableSelect
  ],
  exports: [
    DataTablesCrudButtonsComponent
  ]
})
export class DataTablesExtensionsModule { }

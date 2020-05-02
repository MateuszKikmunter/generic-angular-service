import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DataTablesCrudButtonsComponent } from './data-tables-crud-buttons/data-tables-crud-buttons.component';
import { NgbDatepickerConfigExtension } from './ngb-datepicker-config.extension';

@NgModule({
  declarations: [
    DataTablesCrudButtonsComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [
    DataTablesModule,
    DataTablesCrudButtonsComponent,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [
    NgbDatepickerConfigExtension
  ]
})
export class SharedModule { }

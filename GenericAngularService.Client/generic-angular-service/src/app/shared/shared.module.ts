import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ConfirmComponent } from './components/confirm/confirm.component';
import { DataTablesCrudButtonsComponent } from './components/data-tables-crud-buttons/data-tables-crud-buttons.component';
import { NgbDatepickerConfigExtension } from './ngb-datepicker-config.extension';

@NgModule({
  declarations: [
    ConfirmComponent,
    DataTablesCrudButtonsComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [
    ConfirmComponent,
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

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeModalComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EmployeeModule { }

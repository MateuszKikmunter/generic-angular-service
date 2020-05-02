import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyModalComponent } from './company-modal/company-modal.component';
import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyModalComponent
  ],
  imports: [
    CompanyRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CompanyModule { }

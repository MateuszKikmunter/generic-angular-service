import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyModalComponent } from './company-modal/company-modal.component';
import { CompanyComponent } from './company.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CompanyModule { }

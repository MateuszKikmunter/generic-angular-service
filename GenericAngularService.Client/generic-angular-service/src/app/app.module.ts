import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EnsureAcceptHeaderInterceptor } from './common/ensure-accept-header.interceptor';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyComponent } from './company/company.component';
import { EmployeeService } from './employee/shared/employee-service';
import { appRoutes } from './routes';
import { HandleHttpErrorInterceptor } from './common/handle-http-error.interceptor';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeeModalComponent } from './employee/employee-modal/employee-modal.component';
import { CompanyModalComponent } from './company/company-modal/company-modal.component';
import { CompanyService } from './company/shared/company.service';
import { NgbDatepickerConfigExtension } from './common/ngb-datepicker-config.extension';
import { DataTableSelect } from './common/angular-datatables/data-table-select.service';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { HttpCacheService } from './common/cache/http-cache.service';
import { CacheInterceptor } from './common/cache/cache-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    CompanyComponent,
    NavComponent,
    AboutComponent,
    WelcomeComponent,
    EmployeeModalComponent,
    CompanyModalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnsureAcceptHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleHttpErrorInterceptor,
      multi: true
    },
    CompanyService,
    DataTableSelect,
    EmployeeService,
    HttpCacheService,
    NgbDatepickerConfigExtension
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeModalComponent,
    CompanyModalComponent
  ]
})
export class AppModule {
  constructor() { }
}

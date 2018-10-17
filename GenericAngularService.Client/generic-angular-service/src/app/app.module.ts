import { CompanyService } from './company/shared/company.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    CompanyComponent,
    NavComponent,
    AboutComponent,
    WelcomeComponent,
    EmployeeModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnsureAcceptHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleHttpErrorInterceptor,
      multi: true
    },
    CompanyService,
    EmployeeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeModalComponent
  ]
})
export class AppModule {
  constructor() { }
}

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

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnsureAcceptHeaderInterceptor,
      multi: true
    },
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
 }

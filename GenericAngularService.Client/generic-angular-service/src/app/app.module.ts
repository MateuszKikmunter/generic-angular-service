import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { EnsureAcceptHeaderInterceptor } from './core/services/ensure-accept-header.interceptor';
import { HandleHttpErrorInterceptor } from './core/services/handle-http-error.interceptor';
import { CacheInterceptor } from './core/services/cache/cache-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { WelcomeModule } from './welcome/welcome.module';
import { FooterModule } from './footer/footer.module';
import { AboutModule } from './about/about.module';
import { NavModule } from './nav/nav.module';
import { ConfirmModule } from './confirm/confirm.module';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AboutModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    CompanyModule,
    ConfirmModule,
    EmployeeModule,
    HttpClientModule,
    FooterModule,
    NavModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    WelcomeModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}

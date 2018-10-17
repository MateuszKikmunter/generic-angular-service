import { Company } from 'src/app/company/shared/company';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/common/resource.service';
import { CompanyBase } from './company-base';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends ResourceService<CompanyBase> {

  constructor(http: HttpClient) { 
    super(http, "companies");
  }
}

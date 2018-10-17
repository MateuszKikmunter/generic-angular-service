import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/common/resource.service';
import { CompanyBase } from './company-base';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends ResourceService<CompanyBase> {

  constructor(http: HttpClient) { 
    super(http, "companies");
  }
}

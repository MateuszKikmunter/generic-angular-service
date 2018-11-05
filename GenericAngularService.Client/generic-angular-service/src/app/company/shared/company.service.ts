import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/common/resource.service';

import { DataTablesResponse } from '../../common/angular-datatables/datatables.response';
import { DataTablesOptions } from './../../common/angular-datatables/data-tables.options';
import { CompanyBase } from './company-base';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends ResourceService<CompanyBase> {

  constructor(http: HttpClient) { 
    super(http, "companies");
  }

  public getDataTablesData(dtParameters: DataTablesOptions): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(`${this.apiUrl}/${this.endpoint}/GetTableData`, dtParameters, {});
  }
}

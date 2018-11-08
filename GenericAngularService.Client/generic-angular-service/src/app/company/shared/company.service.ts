import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/common/resource.service';

import { DataTablesOptions } from "../../datatables-extensions/common/data-tables.options"
import { DataTablesResponse } from "../../datatables-extensions/common/datatables.response"
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

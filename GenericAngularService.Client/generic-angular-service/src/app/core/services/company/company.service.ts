import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource.service';

import { DataTablesOptions } from "../../models/data-tables/data-tables.options"
import { DataTablesResponse } from "../../models/data-tables/datatables.response"
import { CompanyBase } from '../../models/company/company-base';

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

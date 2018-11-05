import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataTablesOptions } from './../../common/angular-datatables/data-tables.options';
import { DataTablesResponse } from '../../common/angular-datatables/datatables.response';
import { ResourceService } from '../../common/resource.service';
import { EmployeeBase } from './employee-base';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ResourceService<EmployeeBase> {

  constructor(http: HttpClient) {
    super(http, "employees");
  }

  public getDataTablesData(dtParameters: DataTablesOptions): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(`${this.apiUrl}/${this.endpoint}/GetTableData`, dtParameters, {});
  }
}
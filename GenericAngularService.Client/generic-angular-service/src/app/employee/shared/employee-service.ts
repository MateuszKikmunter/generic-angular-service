import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResourceService } from '../../common/resource.service';
import { EmployeeBase } from './employee-base';
import { DataTablesOptions } from "../../datatables-extensions/common/data-tables.options"
import { DataTablesResponse } from "../../datatables-extensions/common/datatables.response"

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
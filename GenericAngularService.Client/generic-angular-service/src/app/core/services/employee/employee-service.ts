import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResourceService } from '../resource.service';
import { EmployeeBase } from '../../models/employee/employee-base';
import { DataTablesOptions } from "../../models/data-tables/data-tables.options"
import { DataTablesResponse } from "../../models/data-tables/datatables.response"

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
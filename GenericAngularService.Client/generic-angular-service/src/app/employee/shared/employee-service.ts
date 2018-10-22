import { DataTablesResponse } from './../../common/datatables.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResourceService } from '../../common/resource.service';
import { EmployeeBase } from './employee-base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ResourceService<EmployeeBase> {

  constructor(http: HttpClient) {
    super(http, "employees");
  }

  public getDataTablesData(dtParameters: any): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(`${this.apiUrl}/${this.endpoint}/GetTableData`, dtParameters, {});
  }
}
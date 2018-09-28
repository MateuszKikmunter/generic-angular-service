import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { EmployeeService } from './shared/employee-service';
import { Employee } from './shared/employee';
import { environment } from './../../environments/environment';
import { DataTablesResponse } from './../common/datatables.response';
import { faTimes, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  private employees: Employee[] = [];
  private dtOptions: DataTables.Settings = {};
  private employeeActive = faCheck;
  private employeeInactive = faTimes;

  constructor(private employeeService: EmployeeService, private http: HttpClient) { }

  ngOnInit() {
    var that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      searchDelay: 500,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(`${environment.apiUrl}/employees/GetTableData`, dataTablesParameters, {})
          .subscribe(resp => {
            that.employees = resp.data as Employee[];

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [
        { data: "id" },
        { data: "firstName" },
        { data: "lastName" },
        { data: "company" },
        {
          data: "active",
          searchable: false
        }
      ]
    };
  }

  private renderEmployeeActive(isActive: boolean): IconDefinition {
    return isActive ? this.employeeActive : this.employeeInactive;
  }
}
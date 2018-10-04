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
  private dtOptions: any = {};
  private employeeActive = faCheck;
  private employeeInactive = faTimes;
  private selectedEmployee: Employee;

  constructor(private employeeService: EmployeeService, private http: HttpClient) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      searchDelay: 500,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(`${environment.apiUrl}/employees/GetTableData`, dataTablesParameters, {})
          .subscribe(resp => {
            this.employees = resp.data as Employee[];

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
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
      ],
      select: true
    };
  }

  selectRow(employee: Employee): void {
    this.selectedEmployee = (this.selectedEmployee === employee ? null : employee);
  }

  rowSelected(employee: Employee): boolean {
    return this.selectedEmployee === employee;
  }

  private renderEmployeeActive(employeeActive: boolean): IconDefinition {
    return employeeActive ? this.employeeActive : this.employeeInactive;
  }
}
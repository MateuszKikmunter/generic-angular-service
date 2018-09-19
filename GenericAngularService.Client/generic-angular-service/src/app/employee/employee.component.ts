import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


import { EmployeeService } from './shared/employee-service';
import { Employee } from './shared/employee';
import { EmployeeBase } from './shared/employee-base';
import * as $ from 'jquery';
import 'datatables.net';
// import 'datatables.net-bs4';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  private employees: Employee[] = [];
  private dtOptions: DataTables.Settings = {};
  private dtTrigger = new Subject();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.employeeService.getAll().subscribe(e => {
      this.employees = e as Employee[];
      this.dtTrigger.next();
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './shared/employee-service';
import { Employee } from './shared/employee';
import { EmployeeBase } from './shared/employee-base';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  private employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAll().subscribe(e => this.employees = e as Employee[]);
  }

}
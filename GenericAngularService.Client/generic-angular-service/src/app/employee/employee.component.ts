import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { EmployeeService } from './shared/employee-service';
import { Employee } from './shared/employee';
import { environment } from './../../environments/environment';
import { DataTablesResponse } from './../common/datatables.response';
import { faTimes, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { Mode } from '../common/mode.enum';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  private dtOptions: DataTables.Settings = {};
  private dtTrigger = new Subject();
  private employees: Employee[] = [];
  private selectedEmployee: Employee = null;
  private employeeActive = faCheck;
  private employeeInactive = faTimes;

  constructor(private employeeService: EmployeeService, private modalService: NgbModal) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      searchDelay: 500,
      ajax: (dataTablesParameters: any, callback) => {
        this.employeeService.getDataTablesData(dataTablesParameters).subscribe(resp => {
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
      ]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  realoadTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
      this.clearRowSelection();
    });
  }

  private renderEmployeeActive(employeeActive: boolean): IconDefinition {
    return employeeActive ? this.employeeActive : this.employeeInactive;
  }

  private createEmployee(): void {
    this.openModal(null, Mode.add);
  }

  private editEmployee(): void {
    if (this.validateEmployeeSelection()) {
      this.openModal(this.selectedEmployee, Mode.edit);
    }
  }

  private deleteEmployee(): void {
    if (this.validateEmployeeSelection() && confirm("Are you sure?")) {
      this.employeeService.delete(this.selectedEmployee.id).subscribe(() => {
        this.realoadTable();
      });
      this.clearRowSelection();
    }
  }

  private showEmployee(): void {
    this.openModal(this.selectedEmployee, Mode.readonly);
  }

  private validateEmployeeSelection(): boolean {
    if (this.selectedEmployee === null) {
      alert("Please select employee first!");
      return false;
    }

    return true;
  }

  private selectRow(employee: Employee): void {
    this.selectedEmployee = this.rowSelected(employee) ? null : employee;
  }

  private rowSelected(employee: Employee): boolean {
    if (this.selectedEmployee) {
      return this.selectedEmployee.id === employee.id;
    }   
  }

  private clearRowSelection(): void {
    this.selectedEmployee = null;
  }

  private openModal(employee: Employee, mode: Mode): void {
    const modalReference = this.modalService.open(EmployeeModalComponent);
    modalReference.componentInstance.employeeToEdit = employee;
    modalReference.componentInstance.mode = mode;

    modalReference.result.then((result) => {
      if (result === "save") {
        this.realoadTable();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
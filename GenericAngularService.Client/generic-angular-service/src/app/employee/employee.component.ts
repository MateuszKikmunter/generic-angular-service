import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { DataTableSelect } from './../common/data-table-select.service';
import { DataTableDirective } from 'angular-datatables';
import { EmployeeService } from './shared/employee-service';
import { Employee } from './shared/employee';
import { faTimes, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { Mode } from '../common/mode.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public employees: Employee[] = [];
  public dtTrigger = new Subject();

  private employeeActive = faCheck;
  private employeeInactive = faTimes;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public select: DataTableSelect) { }

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
        }, err => alert(err));
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

  public ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  public ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public realoadTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
      this.select.clearRowSelection();
    });
  }

  public createEmployee(): void {
    this.openModal(null, Mode.add);
  }

  public editEmployee(): void {
    if (this.select.validateRowSelection()) {
      this.openModal(this.select.selectedItem as Employee, Mode.edit);
    }
  }

  public deleteEmployee(): void {
    if (this.select.validateRowSelection() && confirm("Are you sure?")) {
      this.employeeService.delete(this.select.selectedItem.id).subscribe(() => {
        this.realoadTable();
        this.toastr.success("Success!");
      }, error => this.toastr.error(error));
      this.select.clearRowSelection();
    }
  }

  private renderEmployeeActive(employeeActive: boolean): IconDefinition {
    return employeeActive ? this.employeeActive : this.employeeInactive;
  }

  private showEmployee(): void {
    this.openModal(this.select.selectedItem as Employee, Mode.readonly);
  }

  private openModal(employee: Employee, mode: Mode): void {
    const modalReference = this.modalService.open(EmployeeModalComponent);
    modalReference.componentInstance.employeeToEdit = employee;
    modalReference.componentInstance.mode = mode;

    modalReference.result.then((result) => {
      if (result === "save") {
        this.realoadTable();
        this.toastr.success("Success!");
      }
    }).catch((error) => {
      this.toastr.error(error);
    });
  }
}
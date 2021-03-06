import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';

import { DataTableSelect } from '../core/services/data-tables/data-table-select.service';
import { DataTableDirective } from 'angular-datatables';
import { EmployeeService } from '../core/services/employee/employee-service';
import { Employee } from '../core/models/employee/employee';
import { faTimes, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { Mode } from '../core/enums/mode.enum';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';
import { Confirmation } from 'src/app/core/enums/confirmation.enum';
import { Action } from '../core/enums/action.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild(DataTableDirective, { static: true })
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
    public select: DataTableSelect<Employee>) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      searchDelay: 500,
      ajax: (dtParameters: any, callback) => {
        this.employeeService.getDataTablesData(dtParameters).subscribe(resp => {
          this.employees = resp.data as Employee[];

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        }, err => this.toastr.error(err));
      },
      columns: [...environment.employeeComlumns]
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

  public deleteEmployee(): void {
    this.modalService.open(ConfirmComponent).result.then((result) => {
      if (result === Confirmation.YES) {
        this.employeeService.delete(this.select.selectedItem.id).subscribe(() => {
          this.reloadAndToastSuccess();
        }, error => this.toastr.error(error));
      }
    }, result => this.onAlternativeModalClose(result));
  }

  public hadleDtButtonClick(action: Action): void {
    this.actionDispatcher(action, this.select.selectedItem);
  }

  private renderEmployeeActive(employeeActive: boolean): IconDefinition {
    return employeeActive ? this.employeeActive : this.employeeInactive;
  }

  private openModal(employee: Employee, mode: Mode): void {
    const modalReference = this.modalService.open(EmployeeModalComponent);
    modalReference.componentInstance.employeeToEdit = employee;
    modalReference.componentInstance.mode = mode;

    modalReference.result.then((result) => {
      if (result === "save") {
        this.reloadAndToastSuccess();
      }
    }, result => this.onAlternativeModalClose(result));
  }

  private reloadAndToastSuccess(): void {
    this.realoadTable();
    this.toastr.success("Success!");
  }

  private onAlternativeModalClose(reason: any): any {
    return reason === ModalDismissReasons.ESC || reason === ModalDismissReasons.BACKDROP_CLICK ? {} : this.toastr.error(reason);
  }

  private actionDispatcher = (action: Action, employee: Employee) => ({
    "ADD": () =>    this.openModal(null, Mode.ADD),
    "EDIT": () =>   this.openModal(employee, Mode.EDIT),
    "VIEW": () =>   this.openModal(employee, Mode.READONLY),
    "DELETE": () => this.deleteEmployee()
  })[action]()
}
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeService } from '../shared/employee-service';
import { Employee } from '../shared/employee';
import { Mode } from '../../common/mode.enum';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {

  constructor(private employeeService: EmployeeService, public modal: NgbActiveModal) { }
  @Input() employeeToEdit: Employee = null;
  @Input() mode: Mode;
  private employeeForm: FormGroup;
  private error: any;

  ngOnInit() {
    this.buildForm(this.employeeToEdit);
  }

  private closeModal(): void {
    this.modal.close("save");
  }

  private saveEmployee() {
    let form = this.employeeForm.value;
    if (this.employeeForm.valid) {
      this.isInAddMode()
        ? this.employeeService.add(form).subscribe(() => this.closeModal())
        : this.employeeService.update(this.employeeToEdit.id, form).subscribe(res => this.closeModal(), err => this.error = err);
    }
  }

  private buildForm(employee: Employee): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl({ value: this.isInAddMode() ? "" : employee.firstName, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(255)]),
      lastName: new FormControl({ value: this.isInAddMode() ? "" : employee.lastName, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(255)]),
      email: new FormControl({ value: this.isInAddMode() ? "" : employee.email, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(255), Validators.email]),
      active: new FormControl({ value: this.isInAddMode() ? false : employee.active, disabled: this.isReadOnly() }, [Validators.required])
    });
  }

  private isReadOnly() {
    return this.mode === Mode.readonly;
  }

  private isInAddMode() {
    return this.mode === Mode.add;
  }

  private getModalTitle(): string {
    if (this.isReadOnly()) {
      return `${this.employeeToEdit.firstName} ${this.employeeToEdit.lastName}`;
    }
    else if (this.isInAddMode()) {
      return "Create";
    } else {
      return "Edit";
    }
  }
}

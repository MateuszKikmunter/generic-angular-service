import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeService } from '../shared/employee-service';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {

  constructor(private employeeService: EmployeeService, public modal: NgbActiveModal) { }
  @Input() employeeId: number;
  @Input() employeeToEdit: Employee = null;
  private employeeForm: FormGroup;

  ngOnInit() {
    this.isInAddMode() ? this.buildForm(this.employeeToEdit) : this.buildForm(this.employeeToEdit);
  }

  private isInAddMode(): boolean {
    return this.employeeToEdit === null;
  }

  private closeModal(): void {
    this.modal.close("employee save");
  }

  private saveEmployee() {
    let form = this.employeeForm.value;
    if (this.employeeForm.valid) {
      this.isInAddMode()
        ? this.employeeService.add(form).subscribe(() => this.closeModal())
        : this.employeeService.update(this.employeeToEdit.id, form).subscribe(() => this.closeModal());
    }
  }

  private buildForm(employee: Employee): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(employee ? employee.firstName : "", [Validators.required, Validators.maxLength(255)]),
      lastName: new FormControl(employee ? employee.lastName : "", [Validators.required, Validators.maxLength(255)]),
      email: new FormControl(employee ? employee.email : "", [Validators.required, Validators.maxLength(255), Validators.email]),
      active: new FormControl(employee ? employee.active : false, [Validators.required])
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../core/services/employee/employee-service';
import { CompanyService } from '../../core/services/company/company.service';
import { EmployeeForManipulation } from '../../core/models/employee/employee-for-manipulation';
import { Employee } from '../../core/models/employee/employee';
import { Mode } from '../../core/enums/mode.enum';
import { Company } from '../../core/models/company/company';
import { ModalHelper } from 'src/app/shared/modal.helper';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  constructor(private employeeService: EmployeeService, public modal: NgbActiveModal, private companyService: CompanyService) { }

  @Input() employeeToEdit: Employee = null;
  @Input() mode: Mode;
  
  public errors: any[];
  public employeeForm: FormGroup;

  private companies: Company[] = [];

  ngOnInit() {
    this.buildForm(this.employeeToEdit);
    this.companyService.getAll().subscribe(c => this.companies = c as Company[]);
  }

  private buildForm(employee: Employee): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl({ value: this.isInAddMode() ? "" : employee.firstName, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(255)]),
      lastName: new FormControl({ value: this.isInAddMode() ? "" : employee.lastName, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(255)]),
      email: new FormControl({ value: this.isInAddMode() ? "" : employee.email, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(255), Validators.email]),
      company: new FormControl({ value: this.isInAddMode() ? "" : employee.company, disabled: this.isReadOnly() }),
      active: new FormControl({ value: this.isInAddMode() ? false : employee.active, disabled: this.isReadOnly() }, [Validators.required])
    });
  }

  public isReadOnly(): boolean {
    return this.mode === Mode.READONLY;
  }

  public isInAddMode(): boolean {
    return this.mode === Mode.ADD;
  }

  public getModalTitle(): string {
    let title = this.employeeToEdit ? `${this.employeeToEdit.firstName} ${this.employeeToEdit.lastName}` : null;
    return ModalHelper.getModalTitle(this.mode, title);
  }

  public search = (searchTerm: Observable<string>): Observable<string[]> => {
    return searchTerm.pipe(
      distinctUntilChanged(),
      map(term => term === ''
        ? []
        : this.companies.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).map(c => c.name).slice(0, 10))
    );
  }

  public saveEmployee(): void {
    if (this.employeeForm.valid) {
      let employee = this.mapToDto(this.employeeForm.value);

      this.isInAddMode()
        ? this.employeeService.add(employee).subscribe(() => this.modal.close("save"), err => this.mapErrors(err))
        : this.employeeService.update(this.employeeToEdit.id, employee).subscribe(() => this.modal.close("save"), err => this.mapErrors(err))
    }
  }

  private mapToDto(form: any): EmployeeForManipulation {
    let employee = new EmployeeForManipulation();
    employee.active = form.active;
    employee.companyId = this.getCompanyForEmployee(form.company);
    employee.email = form.email;
    employee.firstName = form.firstName;
    employee.lastName = form.lastName;

    return employee;
  }

  private getCompanyForEmployee(company: string): any {
    let result = this.companies.find(c => c.name === company);
    return result ? result.id : null;
  }

  private mapErrors(errors: any): void {
    this.errors = [];
    this.errors = errors;
  }
}
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../shared/employee-service';
import { EmployeeForManipulation } from '../shared/employee-for-manipulation';
import { Employee } from '../shared/employee';
import { Mode } from '../../common/mode.enum';
import { environment } from '../../../environments/environment';
import { Company } from '../../company/shared/company';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  constructor(private employeeService: EmployeeService, public modal: NgbActiveModal, private http: HttpClient) { }
  @Input() employeeToEdit: Employee = null;
  @Input() mode: Mode;
  private employeeForm: FormGroup;
  private error: any;
  private companies: Company[] = [];

  //TODO: refactor typeahead functionality, add tests for form, use company service for data fetching (service to add)
  ngOnInit() {
    this.buildForm(this.employeeToEdit);
    this.http.get<Company[]>(`${environment.apiUrl}/companies`).subscribe(c => this.companies = c);
  }

  private closeModal(): void {
    this.modal.close("save");
  }

  private saveEmployee(): void {
    if (this.employeeForm.valid) {
      let employee = this.mapToDto(this.employeeForm.value);

      this.isInAddMode()
        ? this.employeeService.add(employee).subscribe(() => this.closeModal())
        : this.employeeService.update(this.employeeToEdit.id, employee).subscribe(res => this.closeModal(), err => this.error = err);
    }
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

  private isReadOnly(): boolean {
    return this.mode === Mode.readonly;
  }

  private isInAddMode(): boolean {
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

  private searchFormatter = (result: any): any => {
    return result.name ? result.name : result;
  };

  private search = (searchTerm: Observable<string>): Observable<Company[]> => {
        return searchTerm.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term === '' ? []
          : this.companies.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      );
  };

  private mapToDto(form: any): EmployeeForManipulation {
    let employee = new EmployeeForManipulation();
    employee.active = form.active;
    employee.companyId = form.company.id;
    employee.email = form.email;
    employee.firstName = form.firstName;
    employee.lastName = form.lastName;

    return employee;
  }
}
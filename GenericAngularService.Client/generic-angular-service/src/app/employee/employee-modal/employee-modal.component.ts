import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../shared/employee-service';
import { Employee } from '../shared/employee';
import { Mode } from '../../common/mode.enum';
import { environment } from '../../../environments/environment';
import { Company } from '../../company/shared/company';
import { EmployeeForManipulation } from '../shared/employee-for-manipulation';

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


  //TODO: refactor typeahead functionality, add tests for form, use company service for data fetching (service to add) and use automapper for mapping
  ngOnInit() {
    this.buildForm(this.employeeToEdit);
    this.http.get<Company[]>(`${environment.apiUrl}/companies`).subscribe(c => this.companies = c);
  }

  private closeModal(): void {
    this.modal.close("save");
  }

  private saveEmployee() {
    let form = this.employeeForm.value;
    console.log(form);
    let model = new EmployeeForManipulation();
    model.active = form.active;
    model.firstName = form.firstName;
    model.lastName = form.lastName;
    model.email = form.email;
    model.companyId = form.company.id;


    if (this.employeeForm.valid) {
      this.isInAddMode()
        ? this.employeeService.add(model).subscribe(() => this.closeModal())
        : this.employeeService.update(this.employeeToEdit.id, model).subscribe(res => this.closeModal(), err => this.error = err);
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

  private searchFormatter = (result: any) => {
    return result.name ? result.name : result;
  };

  private search = (searchTerm: Observable<string>) => {
        return searchTerm.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term === '' ? []
          : this.companies.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      );
  };
}

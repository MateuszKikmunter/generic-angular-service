import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Mode } from './../../common/mode.enum';
import { NgbActiveModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { CompanyForManipulation } from './../shared/company-for-manipulation';
import { Company } from 'src/app/company/shared/company';
import { CompanyService } from './../shared/company.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.scss']
})
export class CompanyModalComponent implements OnInit {
  @Input() companyToEdit: Company = null;
  @Input() mode: Mode;
  private errors: any[];
  private companyForm: FormGroup;
  private calendarIcon = faCalendar;

  constructor(private companyService: CompanyService, private modal: NgbActiveModal, private dtPickerConfig: NgbDatepickerConfig) { }

  ngOnInit() {
    this.buildForm();
    this.configureDatePicker();
  }

  private configureDatePicker() {
    this.dtPickerConfig.minDate = { day: 1, month: 1, year: 1900 };
    this.dtPickerConfig.maxDate = { day: 31, month: 12, year: new Date().getFullYear() + 10 };
  }

  private closeModal(): void {
    this.modal.close("save");
  }

  private buildForm(): void {
    this.companyForm = new FormGroup({
      name: new FormControl({ value: this.isInAddMode() ? "" : this.companyToEdit.name, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(255)]),
      industry: new FormControl({ value: this.isInAddMode() ? "" : this.companyToEdit.industry, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(155)]),
      founded: new FormControl({ value: this.isInAddMode() ? null : this.getDate(), disabled: this.isReadOnly() }, [Validators.required]),
    });
  }

  private getDate(): any {
    let date = new Date(this.companyToEdit.founded);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  }

  private isReadOnly(): boolean {
    return this.mode === Mode.readonly;
  }

  private isInAddMode(): boolean {
    return this.mode === Mode.add;
  }

  private getModalTitle(): string {
    if (this.isReadOnly()) {
      return `${this.companyToEdit.name}`;
    }
    else if (this.isInAddMode()) {
      return "Create";
    } else {
      return "Edit";
    }
  }

  private saveCompany(): void {
    if (this.companyForm.valid) {
      let company = this.mapToDto(this.companyForm.value);

      this.isInAddMode()
        ? this.companyService.add(company).subscribe(() => this.closeModal(), err => this.mapErrors(err))
        : this.companyService.update(this.companyToEdit.id, company).subscribe(() => this.closeModal(), err => this.mapErrors(err))
    }
  }

  private mapToDto(form: any): CompanyForManipulation {
    let company = new CompanyForManipulation();
    let founded = this.companyForm.get("founded").value;

    company.name = form.name;
    company.industry = form.industry;
    company.founded = new Date(founded.year, founded.month - 1, founded.day);

    return company;
  }

  private mapErrors(errors: any): void {
    this.errors = [];
    this.errors = errors;
  }
}

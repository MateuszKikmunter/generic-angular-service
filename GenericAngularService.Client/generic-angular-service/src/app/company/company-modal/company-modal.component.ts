import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Mode } from './../../common/mode.enum';
import { ModalHelper } from './../../common/modal.helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfigExtension } from './../../common/ngb-datepicker-config.extension';
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
  public errors: any[];
  public calendarIcon = faCalendar;
  public companyForm: FormGroup;

  constructor(private companyService: CompanyService, public modal: NgbActiveModal, public datepickerConfig: NgbDatepickerConfigExtension) { }

  ngOnInit() {
    this.buildForm();
    this.datepickerConfig.configureMinDate(1, 1, 1900);
    this.datepickerConfig.configureMaxDate(31, 12, new Date().getFullYear() + 10);
  }

  private buildForm(): void {
    this.companyForm = new FormGroup({
      name: new FormControl({ value: this.isInAddMode() ? "" : this.companyToEdit.name, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(255)]),
      industry: new FormControl({ value: this.isInAddMode() ? "" : this.companyToEdit.industry, disabled: this.isReadOnly() }, [Validators.required, Validators.maxLength(155)]),
      founded: new FormControl({ value: this.isInAddMode() ? null : this.datepickerConfig.bindInputToValue(new Date(this.companyToEdit.founded)), disabled: this.isReadOnly() }, [Validators.required]),
    });
  }

  private isInAddMode(): boolean {
    return this.mode === Mode.add;
  }

  public isReadOnly(): boolean {
    return this.mode === Mode.readonly;
  }

  public getModalTitle(): string {
    let title = this.companyToEdit ? this.companyToEdit.name : null;
    return ModalHelper.getModalTitle(this.mode, title);
  }

  public saveCompany(): void {
    if (this.companyForm.valid) {
      let company = this.mapToDto(this.companyForm.value);

      this.isInAddMode()
        ? this.companyService.add(company).subscribe(() => this.modal.close("save"), err => this.mapErrors(err))
        : this.companyService.update(this.companyToEdit.id, company).subscribe(() => this.modal.close("save"), err => this.mapErrors(err))
    }
  }

  private mapToDto(form: any): CompanyForManipulation {
    let founded = this.companyForm.get("founded").value;
    
    let company = new CompanyForManipulation();
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

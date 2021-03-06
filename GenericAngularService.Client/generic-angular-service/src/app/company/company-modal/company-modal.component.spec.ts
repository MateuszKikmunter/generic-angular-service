import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyModalComponent } from './company-modal.component';
import { NgbDatepickerModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../../core/services/company/company.service';
import { NgbDatepickerConfigExtension } from 'src/app/shared/ngb-datepicker-config.extension';
import { Mode } from 'src/app/core/enums/mode.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Company } from '../../core/models/company/company';

describe('CompanyModalComponent', () => {
  let component: CompanyModalComponent;
  let fixture: ComponentFixture<CompanyModalComponent>;
  let mockCompanyService, mockNgbActiveModal, mockNgbDatePickerConfigExtension;

  beforeEach(() => {
    mockNgbDatePickerConfigExtension = jasmine.createSpyObj("mockNgbDatePickerConfigExtension",
      [
        "configureMinDate",
        "configureMaxDate"
      ]);

    mockNgbDatePickerConfigExtension.bindInputToValue = () => {
      return { day: 1, month: 1, year: 1988 };
    };

    TestBed.configureTestingModule({
      declarations: [CompanyModalComponent],
      imports: [
        ReactiveFormsModule,
        NgbDatepickerModule,
        FontAwesomeModule
      ],
      providers: [
        { provide: CompanyService, useValue: mockCompanyService },
        { provide: NgbDatepickerConfigExtension, useValue: mockNgbDatePickerConfigExtension },
        { provide: NgbActiveModal, useValue: mockNgbActiveModal }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyModalComponent);
    component = fixture.componentInstance;
  });

  it("should be readonly", () => {
    component.mode = Mode.READONLY;
    component.companyToEdit = new Company();
    component.ngOnInit();
    fixture.detectChanges();

    Object.keys(component.companyForm.controls).forEach(key => {
      expect(component.companyForm.get(key).disabled).toBeTruthy();
    });
  });

  it("should be active - add mode", () => {
    component.mode = Mode.ADD;
    component.companyToEdit = new Company();
    component.ngOnInit();
    fixture.detectChanges();

    Object.keys(component.companyForm.controls).forEach(key => {
      expect(component.companyForm.get(key).disabled).toBeFalsy();
    });

    expect(component.companyForm.invalid).toBeTruthy();
  });

  it("should have assigned values to controls - edit mode", () => {

    let company = new Company();
    company.name = "awesome inc.";
    company.industry = "awesomeness";

    component.mode = Mode.EDIT;
    component.companyToEdit = company;

    component.ngOnInit();
    fixture.detectChanges();

    Object.keys(component.companyForm.controls).forEach(key => {
      key === "founded"
        ? expect(component.companyForm.controls["founded"].value).toEqual(mockNgbDatePickerConfigExtension.bindInputToValue())
        : expect(component.companyForm.get(key).value).toBe(company[key]);

        expect(component.companyForm.get(key).disabled).toBeFalsy();
    });

    expect(component.companyForm.valid).toBeTruthy();
  });

  it("should have required error", () => {
    let company = new Company();

    component.mode = Mode.EDIT;
    component.companyToEdit = company;

    component.ngOnInit();
    fixture.detectChanges();

    component.companyForm.controls["founded"].setValue(null);

    Object.keys(component.companyForm.controls).forEach(key => {
      expect(component.companyForm.controls[key].invalid).toBeTruthy();
      expect(component.companyForm.controls[key].getError("required")).toBeTruthy();
    });

    expect(component.companyForm.invalid).toBeTruthy();
  });

  it("should have max length error", () => {
    let company = new Company();
    for (let i = 0; i < 20; i++) {
      company.name += "invalid control";
      company.industry += "invalid control";
    }

    component.mode = Mode.EDIT;
    component.companyToEdit = company;

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.companyForm.controls["name"].invalid).toBeTruthy();
    expect(component.companyForm.controls["name"].getError("maxlength")).toBeTruthy();
    expect(component.companyForm.controls["industry"].invalid).toBeTruthy();
    expect(component.companyForm.controls["industry"].getError("maxlength")).toBeTruthy();
    expect(component.companyForm.invalid).toBeTruthy();
  });

  it("should have datepicker invalid date error", () => {
    let company = new Company();

    component.mode = Mode.EDIT;
    component.companyToEdit = company;

    component.ngOnInit();
    fixture.detectChanges();

    component.companyForm.controls["founded"].setValue("invalid value");

    expect(component.companyForm.controls["founded"].invalid).toBeTruthy();
    expect(component.companyForm.invalid).toBeTruthy();
  });
});

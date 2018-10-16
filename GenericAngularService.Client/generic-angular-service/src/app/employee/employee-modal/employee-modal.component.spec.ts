import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { EmployeeModalComponent } from './employee-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { Mode } from '../../common/mode.enum';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee-service';
import { Company } from 'src/app/company/shared/company';
import { of } from 'rxjs';

describe("employee-modal-component", () => {
    let component: EmployeeModalComponent;
    let fixture: ComponentFixture<EmployeeModalComponent>;
    let mockEmployeeService, mockNgbActiveModal;

    const http = {
        get() {
            const companies: Company[] = [];
            return of(companies);
        }
    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [EmployeeModalComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                NgbTypeaheadModule
            ],
            providers: [
                { provide: HttpClient, useValue: http },
                { provide: EmployeeService, useValue: mockEmployeeService },
                { provide: NgbActiveModal, useValue: mockNgbActiveModal }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeModalComponent);
        component = fixture.componentInstance;
    });

    it("employee form in readonly mode - all controls should be disabled", () => {
        component.mode = Mode.readonly;
        component.employeeToEdit = new Employee();
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.employeeForm.controls["firstName"].disabled).toBeTruthy();
        expect(component.employeeForm.controls["lastName"].disabled).toBeTruthy();
        expect(component.employeeForm.controls["email"].disabled).toBeTruthy();
        expect(component.employeeForm.controls["company"].disabled).toBeTruthy();
        expect(component.employeeForm.controls["active"].disabled).toBeTruthy();
    });

    it("add mode - form active, all controls are enabled", () => {
        component.mode = Mode.add;
        component.employeeToEdit = new Employee();
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.employeeForm.controls["firstName"].disabled).toBeFalsy();
        expect(component.employeeForm.controls["lastName"].disabled).toBeFalsy();
        expect(component.employeeForm.controls["email"].disabled).toBeFalsy();
        expect(component.employeeForm.controls["company"].disabled).toBeFalsy();
        expect(component.employeeForm.controls["active"].disabled).toBeFalsy();
        expect(component.employeeForm.valid).toBeFalsy();
    });

    it("edit mode - controls have correct values", () => {
        component.mode = Mode.edit;
        let employee = new Employee();
        employee.active = true;
        employee.company = "WTW";
        employee.email = "dummy.user@wtw.com";
        employee.firstName = "dummy";
        employee.lastName = "user";
        employee.id = 1;

        component.employeeToEdit = employee;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.employeeForm.controls["firstName"].value).toBe(employee.firstName);
        expect(component.employeeForm.controls["lastName"].value).toBe(employee.lastName);
        expect(component.employeeForm.controls["email"].value).toBe(employee.email);
        expect(component.employeeForm.controls["company"].value).toBe(employee.company);
        expect(component.employeeForm.controls["active"].value).toBe(employee.active);
        expect(component.employeeForm.valid).toBeTruthy();
    });

    it("edit mode - invalid input, from should be invalid", () => {
        component.mode = Mode.edit;
        let employee = new Employee();
        employee.active = true;
        employee.company = "";
        employee.email = "dummy.user";
        employee.firstName = "";
        employee.lastName = "";
        employee.id = 1;

        component.employeeToEdit = employee;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.employeeForm.controls["firstName"].getError("required")).toBeTruthy();
        expect(component.employeeForm.controls["lastName"].getError("required")).toBeTruthy();
        expect(component.employeeForm.controls["email"].getError("email")).toBeTruthy();

        expect(component.employeeForm.valid).toBeFalsy();
    });

    
    it("edit mode - max length exceeded - form should be invalid", () => {
        component.mode = Mode.edit;
        let employee = new Employee();
        employee.active = true;
        employee.company = "";
        employee.email = "dummy.user";
        employee.firstName = "";
        employee.lastName = "";
        employee.id = 1;

        for(let i = 0; i < 300; i++) {
            employee.firstName += "a";
            employee.lastName += "a";
            employee.email += "a";
        }

        component.employeeToEdit = employee;
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.employeeForm.controls["firstName"].getError("maxlength")).toBeTruthy();
        expect(component.employeeForm.controls["lastName"].getError("maxlength")).toBeTruthy();
        expect(component.employeeForm.controls["email"].getError("maxlength")).toBeTruthy();
        expect(component.employeeForm.controls["email"].getError("email")).toBeTruthy();

        expect(component.employeeForm.valid).toBeFalsy();
    });
});
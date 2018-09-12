import { Routes } from "@angular/router";

import { CompanyComponent } from './company/company.component';
import { EmployeeComponent } from "./employee/employee.component";

export const appRoutes: Routes = [
    { path: "employees", component: EmployeeComponent },
    { path: "companies", component: CompanyComponent }
];
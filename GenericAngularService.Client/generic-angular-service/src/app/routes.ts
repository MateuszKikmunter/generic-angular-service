import { Routes } from "@angular/router";

import { CompanyComponent } from './company/company.component';
import { EmployeeComponent } from "./employee/employee.component";
import { AboutComponent } from './about/about.component';

export const appRoutes: Routes = [
    { path: "employees", component: EmployeeComponent },
    { path: "companies", component: CompanyComponent },
    { path: "about", component: AboutComponent }
];
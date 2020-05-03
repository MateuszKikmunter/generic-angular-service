import { EmployeeBase } from "./employee-base";

export interface Employee extends EmployeeBase {
  id: any;
  company: string;
  fullName: string;
}
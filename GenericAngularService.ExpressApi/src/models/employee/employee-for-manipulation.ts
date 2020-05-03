import { EmployeeBase } from "./employee-base";

export interface EmployeeForManipulation extends EmployeeBase {
  companyId?: number;
}

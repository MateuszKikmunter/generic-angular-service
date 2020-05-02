import { BaseEntity } from '../base.entity';
import { EmployeeBase } from './employee-base';

export class Employee extends EmployeeBase implements BaseEntity {
    id: any;
    company: string;
    fullName: string;
  }
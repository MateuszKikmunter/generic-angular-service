import { BaseEntity } from './../../common/base.entity';
import { EmployeeBase } from './employee-base';

export class Employee extends EmployeeBase implements BaseEntity {
    id: any;
    company: string;
  }
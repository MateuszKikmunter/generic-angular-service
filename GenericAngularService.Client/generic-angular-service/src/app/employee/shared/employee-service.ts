import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResourceService } from '../../common/resource.service';
import { EmployeeBase } from './employee-base';
import { Employee } from './employee';

@Injectable({
    providedIn: 'root'
  })
  export class EmployeeService extends ResourceService<EmployeeBase>{

    constructor(http: HttpClient){
      super(http, "employees");
    }
  }
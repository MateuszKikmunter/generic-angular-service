import { Injectable } from "@angular/core";
import { Employee } from "../models/employee/employee";
import { ResourceService } from "./resource.service";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
  })
  export class FakeService extends ResourceService<Employee> {
    apiUrl = "/api";
  
    constructor(http: HttpClient) {
      super(http, "fake");
    }
  }
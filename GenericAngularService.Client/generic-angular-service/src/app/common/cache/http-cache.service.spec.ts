import { TestBed } from '@angular/core/testing';

import { HttpCacheService } from './http-cache.service';
import { DataTablesOptions } from "../../datatables-extensions/common/data-tables.options";
import { HttpResponse, HttpRequest } from '@angular/common/http';

describe('HttpCacheService', () => {
  let service: HttpCacheService;

  beforeEach(() => 
  TestBed.configureTestingModule({
    providers: [
      HttpCacheService
    ]
  }));

  beforeEach(() => {
    service = new HttpCacheService();
  });

  it('should be created', () => {
    const service: HttpCacheService = TestBed.get(HttpCacheService);
    expect(service).toBeTruthy();
  });

  it("should add item to cache and then return it", () => {
    let response = new HttpResponse<any>();
    let request = new HttpRequest<any>("POST", "api/GetTableData", new DataTablesOptions(), {});
    
    service.put(request, new HttpResponse<any>());
    let result = service.get(request);
    expect(result).toBeTruthy();
    expect(result).toEqual(response);
  });

  it("should reset cache", () => {
    let request = new HttpRequest<any>("POST", "api/GetTableData", new DataTablesOptions(), {});
    service.put(request, new HttpResponse<any>());

    service.invalidateCache();
    expect(service.get(request)).toBeUndefined();
  });
});

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FakeService } from './fake.service';
import { Employee } from './../employee/shared/employee';
import { EnsureAcceptHeaderInterceptor } from './ensure-accept-header.interceptor';

describe("ResourceService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FakeService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: EnsureAcceptHeaderInterceptor,
          multi: true
        }
      ]
    })
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should get single item with http.get', inject([HttpTestingController, FakeService], (httpMock: HttpTestingController, service: FakeService) => {

    service.getSingle(1).subscribe(data => {
      expect(data.id).toBe(1);
      expect(data.firstName).toBe("Luke");
      expect(data.lastName).toBe("Skywalker");
      expect(data.company).toBe("Star Wars");
    });

    const req = httpMock.expectOne("/api/fake/1");
    expect(req.request.method).toEqual("GET");
    expect(req.request.headers.has("Accept")).toBeTruthy();
    expect(req.request.headers.get("Accept")).toBe("application/json");

    req.flush({ id: 1, firstName: "Luke", lastName: "Skywalker", company: "Star Wars" });
  }));

  it("should get all records with http.get", inject([HttpTestingController, FakeService], (httpMock: HttpTestingController, service: FakeService) => {
    service.getAll().subscribe(data => {
      expect(data.length).toBe(2);
    });

    const req = httpMock.expectOne("/api/fake");
    expect(req.request.method).toEqual("GET");
    expect(req.request.headers.has("Accept")).toBeTruthy();
    expect(req.request.headers.get("Accept")).toBe("application/json");

    req.flush([{ id: 1 }, { id: 2 }]);
  }));

  it("should call http.delete with the right URL", inject([HttpTestingController, FakeService], (httpMock: HttpTestingController, service: FakeService) => {

    service.delete(1).subscribe(data => {
      expect(data["status"]).toBe(204);
      expect(data["statusText"]).toBe("No-Content");
    });

    const req = httpMock.expectOne("/api/fake/1");
    expect(req.request.method).toEqual("DELETE");
    expect(req.request.headers.has("Accept")).toBeTruthy();
    expect(req.request.headers.get("Accept")).toBe("application/json");

    req.flush(null, { status: 204, statusText: "No-Content" });
  }));

  it("should call http.post with the right URL", inject([HttpTestingController, FakeService], (mockHttp: HttpTestingController, service: FakeService) => {
    service.add(new Employee()).subscribe(data => {
      expect(data instanceof Employee).toBeTruthy();
    });

    const req = mockHttp.expectOne("/api/fake");
    expect(req.request.method).toEqual("POST");
    expect(req.request.headers.has("Accept")).toBeTruthy();
    expect(req.request.headers.get("Accept")).toBe("application/json");

    req.flush(new Employee());
  }));

  it("should call http.put with the right URL", inject([HttpTestingController, FakeService], (mockHttp: HttpTestingController, service: FakeService) => {

    service.update(1, new Employee()).subscribe(data => {
      expect(data["status"]).toBe(200);
      expect(data["statusText"]).toBe("OK");
    });

    const req = mockHttp.expectOne("/api/fake/1");
    expect(req.request.method).toEqual("PUT");
    expect(req.request.headers.has("Accept")).toBeTruthy();
    expect(req.request.headers.get("Accept")).toBe("application/json");

    req.flush(null, { status: 200, statusText: "OK" });
  }));
});
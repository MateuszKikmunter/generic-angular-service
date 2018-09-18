import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FakeService } from './fake.service';

describe("ResourceService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [FakeService]
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

    req.flush({ id: 1, firstName: "Luke", lastName: "Skywalker", company: "Star Wars" });
  }));

  it("should get all records with http.get", inject([HttpTestingController, FakeService], (httpMock: HttpTestingController, service: FakeService) => {
    service.getAll().subscribe(data => {
      expect(data.length).toBe(2);
    });

    const req = httpMock.expectOne("/api/fake");
    req.flush([{ id: 1 }, { id: 2 }]);
  }));
});
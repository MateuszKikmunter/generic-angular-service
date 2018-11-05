import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse, HttpRequest } from "@angular/common/http";

import { CacheInterceptor } from "./cache-interceptor";
import { HttpCacheService } from './http-cache.service';
import { CacheEntry } from "./cache.entry";
import { DataTablesOptions } from "../angular-datatables/data-tables.options";
import { url } from "inspector";

describe("cache-interceptor", () => {
    let dataTableUrl = "api/GetTableData";
    let fakeUrl = "api/fake";
    let post = "POST";
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CacheInterceptor,
                    multi: true
                },
                HttpCacheService
            ]
        });
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it("should return data from server when non cacheable request", inject([HttpTestingController, HttpClient], (mockHttpController: HttpTestingController, mockHttpClient: HttpClient) => {
        mockHttpClient.post(fakeUrl, {}).subscribe(res => {
            expect(res["id"]).toBe(1);
            expect(res["name"]).toBe("test");
        });

        const req = mockHttpController.expectOne(fakeUrl);
        expect(req.request.method).toBe(post);

        req.flush({ id: 1, name: "test" })
    }));

    it("should return udefined when no correspondent item in cache", inject([HttpTestingController, HttpClient], (mockHttpController: HttpTestingController, mockHttpClient: HttpClient) => {
        mockHttpClient.post(dataTableUrl, {}).subscribe(res => expect(res).toBeUndefined());

        const req = mockHttpController.expectOne(dataTableUrl);
        expect(req.request.method).toBe(post);
    }));

    it("should return cached item", inject([HttpTestingController, HttpClient], (mockHttpController: HttpTestingController, mockHttpClient: HttpClient) => {
        let service = new HttpCacheService();
        let dtOptions = new DataTablesOptions();
        let request = new HttpRequest(post, dataTableUrl, { body: dtOptions });
        let entry: CacheEntry = { url: dataTableUrl, options: dtOptions, reponse: new HttpResponse<any>() };

        service.put(request, entry.reponse);
        mockHttpClient.post(dataTableUrl, dtOptions, {}).subscribe(res => expect(res).toEqual(entry));

        const req = mockHttpController.expectOne(dataTableUrl);
        expect(req.request.method).toBe(post);
        expect(req.request.body).toBe(dtOptions);
    }));
});
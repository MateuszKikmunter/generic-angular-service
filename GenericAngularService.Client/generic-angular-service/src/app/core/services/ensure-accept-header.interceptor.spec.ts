import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject, async } from "@angular/core/testing";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EnsureAcceptHeaderInterceptor } from './ensure-accept-header.interceptor';

describe("ensure-accept-header-interceptor", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: EnsureAcceptHeaderInterceptor,
                    multi: true
                }
            ]
        });
    });

    afterEach(inject([HttpTestingController], (mockHttp: HttpTestingController) => {
        mockHttp.verify();
    }));

    it("should add accept header to http request", async(inject([HttpTestingController, HttpClient], (mockHttpController: HttpTestingController, mockHttpClient: HttpClient) => {
        mockHttpClient.get("/api/fake").subscribe();

        const req = mockHttpController.expectOne("/api/fake");
        expect(req.request.headers.has("Accept")).toBeTruthy();
        expect(req.request.headers.get("Accept")).toBe("application/json");
    })));
});
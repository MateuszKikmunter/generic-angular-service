import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { HandleHttpErrorInterceptor } from './handle-http-error.interceptor';

describe("handle-http-error-interceptor", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HandleHttpErrorInterceptor,
                    multi: true
                }
            ]
        });
    });

    afterEach(inject([HttpTestingController], (mockHttp: HttpTestingController) => {
        mockHttp.verify();
    }));

    it("should handle error", inject([HttpTestingController, HttpClient], (mockHttp: HttpTestingController, mockHttpClient: HttpClient) => {
        mockHttpClient.get("/error").subscribe();
        mockHttp.expectOne("/error").error(new ErrorEvent("Not Found"), {
            status: 404,
            statusText: "Not Found"
        });
    }));
});
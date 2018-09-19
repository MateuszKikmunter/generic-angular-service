import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';

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

        spyOn(console, "log");
    });

    afterEach(inject([HttpTestingController], (mockHttp: HttpTestingController) => {
        mockHttp.verify();
    }));

    it("should handle error", async(inject([HttpTestingController, HttpClient], (mockHttp: HttpTestingController, mockHttpClient: HttpClient) => {
        mockHttpClient.get("/error").subscribe(() => { }, errorResponse => {
            expect(errorResponse).toBeTruthy();
        });

        mockHttp.expectOne("/error").error(new ErrorEvent("Not Found"), {
            status: 404,
            statusText: "Not Found"
        });

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith("Http error (client/network). Http failure response for /error: 404 Not Found");
    })));
});
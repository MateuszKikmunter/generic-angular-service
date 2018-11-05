// import { TestBed, inject, async } from "@angular/core/testing";
// import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
// import { HTTP_INTERCEPTORS } from "@angular/common/http";

// import { CacheInterceptor } from "./cache-interceptor";
// import { HttpCacheService } from './http-cache.service';

// describe("cache-interceptor", () => {

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 HttpClientTestingModule
//             ],
//             providers: [
//                 {
//                     provide: HTTP_INTERCEPTORS,
//                     useClass: CacheInterceptor,
//                     multi: true
//                 },
//                 HttpCacheService
//             ]
//         });
//     });

//     afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
//         httpMock.verify();
//     }));
// });
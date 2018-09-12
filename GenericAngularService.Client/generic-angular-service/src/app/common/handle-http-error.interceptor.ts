// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http/src/response';


// @Injectable()
// export class HandleHttpErrorInterceptor implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request)
//             .catch((error: HttpErrorResponse) => {
//                 if (error.error instanceof Error) {
//                     // client-side or network error
//                     const errorToLog = `Http error (client/network). ${error.message}`;
//                     console.log(errorToLog);
//                 }
//                 else {
//                     // unsuccesful response code                   
//                     const errorToLog = `Http error (unsuccessful reponse). Message: ${error.message}, status code: ${(error).status}, body: ${JSON.stringify(error.error)} `;
//                     console.log(errorToLog);
//                 }

//                 if (error.status === 422) {
//                     // throw the error body
//                     return Observable.throw(error.error);
//                 }
//                 else {
//                     return of(new HttpResponse());
//                 }
//             }
//             )
//     }
// }
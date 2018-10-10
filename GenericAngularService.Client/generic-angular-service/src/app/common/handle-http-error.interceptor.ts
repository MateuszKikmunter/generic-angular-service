import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators/catchError';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HandleHttpErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            if (error.error instanceof ErrorEvent) {
                // client-side or network error
                const errorToLog = `Http error (client/network). ${error.message}`;
                console.log(errorToLog);
            } else {
                // unsuccesful response code
                const errorToLog = `Http error (unsuccessful reponse). Message: ${error.message}, status code: ${(error).status}`;
                console.log(errorToLog);
            }

            return error.status === 422 ? throwError(error.error.map(e => e)) : throwError(["Something went wrong, please try again."]);
        }));
    }
}
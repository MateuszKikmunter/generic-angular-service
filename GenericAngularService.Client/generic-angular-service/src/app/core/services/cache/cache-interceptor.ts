import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HttpCacheService } from './http-cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRequestCacheable(request)) {
            this.cacheService.invalidateCache();
            return next.handle(request);
        }

        let cachedResponse = this.cacheService.get(request);
        if (cachedResponse) {
            return of(cachedResponse);
        }

        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                this.cacheService.put(request, event);
            }
        }));
    }

    private isRequestCacheable(request: HttpRequest<any>): boolean {
        return request.method === "POST" && request.url.indexOf("GetTableData") > -1;
    }
}
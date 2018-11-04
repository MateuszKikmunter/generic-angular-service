import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest } from '@angular/common/http';

@Injectable()
export class HttpCacheService {
  private requests: any = {};

  constructor() { }

  public put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    this.requests[req.body.start] = response;
  }

  public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    return this.requests[req.body.start];
  }

  public invalidateCache(): void {
    this.requests = {};
  }
}

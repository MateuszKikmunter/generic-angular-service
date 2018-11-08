import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest } from '@angular/common/http';

import { isEqual, omit } from "lodash";
import { CacheEntry } from './cache.entry';
import { DataTablesOptions } from '../../datatables-extensions/common/data-tables.options';

@Injectable()
export class HttpCacheService {
  private requests: CacheEntry[] = [];

  constructor() { }

  public put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    let cachedEntry = this.get(req);
    if (!cachedEntry) {
      let entry: CacheEntry = { url: req.url, reponse: response, options: req.body };
      this.requests.push(entry);
    }
  }

  public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    let entry = this.requests.find(entry => this.checkCacheEquality(entry.options, req.body) && entry.url.indexOf(req.url) > -1);
    return entry ? entry.reponse : undefined;
  }

  public invalidateCache(): void {
    this.requests = [];
  }

  private checkCacheEquality(first: DataTablesOptions, second: DataTablesOptions): boolean {
    let draw = "draw";
    return isEqual(omit(first, [draw]), omit(second, [draw]));
  }
}

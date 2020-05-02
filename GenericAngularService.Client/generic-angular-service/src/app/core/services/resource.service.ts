import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export abstract class ResourceService<T> {
  protected apiUrl = environment.apiUrl;

  constructor(protected http: HttpClient, protected endpoint: string) { }

  public getSingle(id: any): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.endpoint}`);
  }

  public delete(id: any) {
    return this.http.delete(`${this.apiUrl}/${this.endpoint}/${id}`);
  }

  public add(item: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoint}`, item);
  }

  public update(id:any, item: T) {
    return this.http.put<T>(`${this.apiUrl}/${this.endpoint}/${id}`, item);
  }
}

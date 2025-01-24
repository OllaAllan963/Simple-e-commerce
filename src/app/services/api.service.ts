import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiRest } from '../api-url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);
  constructor() { }

  getRequest<T>(name: string): Observable<T> {
    return this.http.get<T>(`${apiRest}${name}`);
  }
}

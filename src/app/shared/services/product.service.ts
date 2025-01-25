import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = inject(ApiService);
  constructor() { }

  getProducts(): Observable<Array<Product>> {
    return this.api.getRequest<any>('products');
  }
}

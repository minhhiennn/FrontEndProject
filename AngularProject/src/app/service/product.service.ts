import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'https://first-fucking-app-angular.herokuapp.com/products';
  constructor(private http: HttpClient) {}
  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}

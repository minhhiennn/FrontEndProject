import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  url = 'https://first-fucking-app-angular.herokuapp.com/products';
  constructor(private http: HttpClient) {
    this.http.get<Product[]>(this.url).subscribe(((data) => {
      this.products = data;
    }));
  }
  // TODO: GET ALL LIST PRODUCT
  getProducts(): Product[] {
    return this.products;
  }
  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}

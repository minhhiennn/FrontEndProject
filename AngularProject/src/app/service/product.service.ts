import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  url = 'https://first-fucking-app-angular.herokuapp.com/products';
  constructor(private http: HttpClient) {
    this.http.get(this.url).subscribe(((data) => {
      let x: number = Object.values(data).length;
      console.log(x);
      for (let i = 0; i < Object.values(data).length; i++) {
        let x1: any = Object.values(data)[i];
        let product: Product = new Product(x1.id, x1.price, x1.name, x1.img);
        this.products.push(product);
      }
    }));
  }
  // TODO: GET ALL LIST PRODUCT
  getProducts(): Product[] {
    return this.products;
  }
  getData() {
    return this.http.get(this.url);
  }
}

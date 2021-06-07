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
    //for (let i = 0; i < products.length; i++) {
    //  let product = new Product(products[i].id, products[i].price, products[i].name, products[i].img)
    //  this.products.push(product);
    //}
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
  //getProductById(productId: number): Product | null {
  //  let product: Product | null = null;
  //  for (let i = 0; i < this.products.length; i++) {
  //    if (this.products[i].id === productId) {
  //      product = this.products[i];
  //    }
  //  }
  //  return product;
  //}
  getProductsByName(name: string): Product[] {
    let productList: Product[] = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].getName().toLowerCase().includes(name.toLowerCase())) {
        productList.push(this.products[i]);
      }
    }
    return productList;
  }
}

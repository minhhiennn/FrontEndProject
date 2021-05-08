import { Injectable } from '@angular/core';
import { Product } from '../models/product'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    new Product(1, 56, 'Easy Polo Black Edition', 'assets/images/home/product1.jpg'),
    new Product(2, 56, 'Easy Polo Black Edition', 'assets/images/home/product2.jpg'),
    new Product(3, 56, 'Easy Polo Black Edition', 'assets/images/home/product3.jpg'),
    new Product(4, 56, 'Easy Polo Black Edition', 'assets/images/home/product4.jpg'),
    new Product(5, 56, 'Easy Polo Black Edition', 'assets/images/home/product5.jpg'),
    new Product(6, 56, 'Easy Polo Black Edition', 'assets/images/home/product6.jpg'),
    new Product(7, 56, 'Easy Polo Black Edition', 'assets/images/home/gallery1.jpg'),
    new Product(8, 56, 'Easy Polo Black Edition', 'assets/images/home/gallery2.jpg'),
    new Product(9, 56, 'Easy Polo Black Edition', 'assets/images/home/gallery3.jpg'),
    new Product(10, 56, 'Easy Polo Black Edition', 'assets/images/home/gallery4.jpg'),
    new Product(11, 56, 'Easy Polo Black Edition', 'assets/images/shop/product7.jpg'),
    new Product(12, 56, 'Easy Polo Black Edition', 'assets/images/shop/product8.jpg'),
    new Product(13, 56, 'Easy Polo Black Edition', 'assets/images/shop/product9.jpg'),
    new Product(14, 56, 'Easy Polo Black Edition', 'assets/images/shop/product10.jpg'),
    new Product(15, 56, 'Easy Polo Black Edition', 'assets/images/shop/product11.jpg'),
    new Product(16, 56, 'Easy Polo Black Edition', 'assets/images/shop/product12.jpg'),
  ] 
  constructor() { }
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
}

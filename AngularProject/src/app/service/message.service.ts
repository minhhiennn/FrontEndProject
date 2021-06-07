import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
//import { Subject } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  items: CartItem[] = [];
  //subject = new Subject();
  constructor() { }
  //sendMessage(product: Product) {
  //  this.subject.next(product);//Triggering an event 
  //}
  //getMessage() {
  //  return this.subject.asObservable();
  //}
  addToCart(product: Product) {
    if (this.checkExistProduct(product) === true) {
      let num = this.getIndexExistProduct(product);
      this.items[num].setQuantity(this.items[num].getQuantity() + 1);
      this.items[num].setPriceTotal(this.items[num].getPriceTotal() + this.items[num].getProduct().getPrice());
    } else {
      this.items.push(new CartItem(product, 1, product.getPrice()));
    }
  }
  checkExistProduct(product: Product): boolean {
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].getProduct().getId() === product.getId()) {
        return true;
      }
    }
    return false;
  }
  getIndexExistProduct(product: Product): number {
    let num = 0;
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].getProduct().getId() === product.getId()) {
         num = i;
      }
    }
    return num;
  }
  getItem() {
    return this.items;
  }
}

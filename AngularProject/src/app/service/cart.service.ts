import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];
  urlCart = "https://first-fucking-app-angular.herokuapp.com/cart";
  constructor(private http: HttpClient) {
    this.getData().subscribe((data: CartItem[]) => {
      this.items = data;
    });
  }
  addToCart(product: Product) {
    // nếu tìm thấy cartItem chứa product đó
    // tăng price vs quantity lên
    if (this.checkExistProduct(product) === true) {
      let num = this.getIndexExistProduct(product);
      let id: number = this.items[num].id;
      let quantity: number = this.items[num].quantity + 1;
      let price_total: number = this.items[num].price_total + product.price;
      this.putData(id, new CartItem(id, product, quantity, price_total)).subscribe(response => {
        this.getData().subscribe((data: CartItem[]) => {
          this.items = data;
        });
      });
    } else {
      // nếu ko tìm thấy cartItem nào
      // lấy ra id lớn nhất của cartItem + 1
      this.postData(new CartItem(this.getMaxIndexCartItem() + 1, product, 1, product.price)).subscribe(response => {
        this.getData().subscribe((data: CartItem[]) => {
          this.items = data;
        });
      });
    }
  }
  checkExistProduct(product: Product): boolean {
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === product.id) {
        return true;
      }
    }
    return false;
  }
  getIndexExistProduct(product: Product): number {
    let num = 0;
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === product.id) {
        num = i;
      }
    }
    return num;
  }
  // lấy ra được id lớn nhất của cartItem (cartItem.id)
  getMaxIndexCartItem(): number {
    let maxIndex: number = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id > maxIndex) {
        console.log(this.items[i].id);
        maxIndex = this.items[i].id;
      }
    }
    return maxIndex;
  }
  //////
  getProductAndQuantity(quantity: number, product: Product) {
    if (this.checkExistProduct(product) === true) {
      let num = this.getIndexExistProduct(product);
      let id: number = this.items[num].id;
      let quantityy: number = this.items[num].quantity + quantity;
      let price_total: number = this.items[num].price_total * quantityy;
      this.putData(id, new CartItem(id, product, quantityy, price_total)).subscribe(response => {
        this.getData().subscribe((data: CartItem[]) => {
          this.items = data;
        });
      });
    } else {
      // nếu ko tìm thấy cartItem nào
      // lấy ra id lớn nhất của cartItem + 1
      let price_total: number = product.price * quantity;
      this.postData(new CartItem(this.getMaxIndexCartItem() + 1, product, quantity, price_total)).subscribe(response => {
        this.getData().subscribe((data: CartItem[]) => {
          this.items = data;
        });
      });
    }
  }
  getData1() {
    return this.http.get<CartItem[]>(this.urlCart).subscribe(data => this.items = data);
  }
  // lấy dữ liệu từ urlCart 
  getData(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.urlCart);
  }
  // thêm cartItem mới
  postData(cartitem: CartItem) {
    return this.http.post(this.urlCart, cartitem);
  }
  // thay đổi dữ liệu (thay đổi dữ liệu 1 id cartItem nào đó)
  putData(id: number, cartItem: CartItem) {
    return this.http.patch(this.urlCart + "/" + id, cartItem);
  }
  // xóa dữ liệu(phụ thuộc vào id cartItem)
  deleteData(id: number) {
    return this.http.delete(this.urlCart + "/" + id);
  }
}

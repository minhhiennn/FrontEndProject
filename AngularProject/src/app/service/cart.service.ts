import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];
  currentUser: any;
  urlCart = "https://first-fucking-app-angular.herokuapp.com/cart";
  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
  }
  addToCart(product: Product) {
    // nếu tìm thấy cartItem chứa product đó
    // tăng price vs quantity lên
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      this.getData().subscribe((data: CartItem[]) => {
        this.items = data;
        if (this.checkExistProduct(product) === true) {
          let num = this.getIndexExistProduct(product);
          let id: number = this.items[num].id;
          let quantity: number = this.items[num].quantity + 1;
          let price_total: number = this.items[num].price_total + product.price;
          this.putData(id, new CartItem(id, product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
            this.getData().subscribe((data: CartItem[]) => {
              this.items = data;
              this.router.navigate(['/cart']);
            });
          });
        } else {
          // nếu ko tìm thấy cartItem nào
          // lấy ra id lớn nhất của cartItem + 1
          this.postData(new CartItem(this.getMaxIndexCartItem() + 1, product, 1, product.price, this.currentUser?.id)).subscribe(() => {
            this.getData().subscribe((data: CartItem[]) => {
              this.items = data;
              this.router.navigate(['/cart']);
            });
          });
        }
      });
    } else {
      let CookieCart: any = localStorage.getItem("CookieCart");
      if (CookieCart != null) {
        let listCartItem: CartItem[] = JSON.parse(CookieCart) as CartItem[];
        this.items = listCartItem;
        if (this.checkExistProduct(product) === true) {
          let num = this.getIndexExistProduct(product);
          let quantity: number = this.items[num].quantity + 1;
          let price_total: number = this.items[num].price_total + product.price;
          listCartItem[num].quantity = quantity;
          listCartItem[num].price_total = price_total;
          localStorage.setItem("CookieCart", JSON.stringify(listCartItem));
          this.router.navigate(['/cart']);
        } else {
          listCartItem.push(new CartItem(this.getMaxIndexCartItem() + 1, product, 1, product.price));
          localStorage.setItem("CookieCart", JSON.stringify(listCartItem));
          this.router.navigate(['/cart']);
        }
      } else {
        let listCartItem: CartItem[] = [];
        listCartItem.push(new CartItem(1, product, 1, product.price));
        localStorage.setItem("CookieCart", JSON.stringify(listCartItem));
        this.router.navigate(['/cart']);
      }
    }
  }
  cartSync(cartItems: CartItem[], i: number): boolean {
    this.currentUser = this.userService.getCurrentUser();
    if (i < cartItems.length) {
      this.getData().subscribe((data: CartItem[]) => {
        this.items = data;
        if (this.checkExistProduct(cartItems[i].product) === true) {
          let num = this.getIndexExistProduct(cartItems[i].product);
          let id: number = this.items[num].id;
          let quantity: number = this.items[num].quantity + cartItems[i].quantity;
          let price_total: number = this.items[num].price_total + cartItems[i].product.price;
          this.putData(id, new CartItem(id, cartItems[i].product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
            this.getData().subscribe((data: CartItem[]) => {
              this.items = data;
              this.cartSync(cartItems, i + 1)
            });
          });
        } else {
          // nếu ko tìm thấy cartItem nào
          // lấy ra id lớn nhất của cartItem + 1
          this.postData(new CartItem(this.getMaxIndexCartItem() + 1, cartItems[i].product, cartItems[i].quantity, cartItems[i].price_total, this.currentUser?.id)).subscribe(() => {
            this.getData().subscribe((data: CartItem[]) => {
              this.items = data;
              this.cartSync(cartItems, i + 1)
            });
          });
        }
      });
      return false;
    } else {
      localStorage.removeItem("CookieCart");
      this.router.navigate(['/cart']);
      return true
    }
  }
  checkExistProduct(product: Product): boolean {
    for (let i: number = 0; i < this.items.length; i++) {
      if (this.items[i].id_User == this.currentUser?.id) {
        if (this.items[i].product.id === product.id) {
          return true;
        }
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
        maxIndex = this.items[i].id;
      }
    }
    return maxIndex;
  }
  getLastIndexInProductId(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.urlCart}?_sort=id&_order=desc`);

  }
  //////
  getProductAndQuantity(quantity: number, product: Product) {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      this.getData().subscribe((data: CartItem[]) => {
        this.items = data;
        if (this.checkExistProduct(product) === true) {
          let num = this.getIndexExistProduct(product);
          let id: number = this.items[num].id;
          let quantityy: number = this.items[num].quantity + quantity;
          let price_total: number = product.price * quantityy;
          this.putData(id, new CartItem(id, product, quantityy, price_total, this.currentUser?.id)).subscribe(response => {
            this.getData().subscribe((data: CartItem[]) => {
              this.items = data;
              this.router.navigate(['/cart']);
            });
          });
        } else {
          // nếu ko tìm thấy cartItem nào
          // lấy ra id lớn nhất của cartItem + 1
          let price_total: number = product.price * quantity;
          this.postData(new CartItem(this.getMaxIndexCartItem() + 1, product, quantity, price_total, this.currentUser?.id)).subscribe(response => {
            this.getData().subscribe((data: CartItem[]) => {
              this.items = data;
              this.router.navigate(['/cart']);
            });
          });
        }
      });
    } else {
      let CookieCart: any = localStorage.getItem("CookieCart");
      if (CookieCart != null) {
        let listCartItem: CartItem[] = JSON.parse(CookieCart) as CartItem[];
        this.items = listCartItem;
        if (this.checkExistProduct(product) === true) {
          let num = this.getIndexExistProduct(product);
          let quantityy: number = this.items[num].quantity + quantity;
          let price_total: number = product.price * quantityy;
          listCartItem[num].quantity = quantityy;
          listCartItem[num].price_total = price_total;
          localStorage.setItem("CookieCart", JSON.stringify(listCartItem));
          this.router.navigate(['/cart']);
        } else {
          let price_total: number = product.price * quantity
          listCartItem.push(new CartItem(this.getMaxIndexCartItem() + 1, product, quantity, price_total));
          localStorage.setItem("CookieCart", JSON.stringify(listCartItem));
          this.router.navigate(['/cart']);
        }
      } else {
        let listCartItem: CartItem[] = [];
        let price_total: number = product.price * quantity
        listCartItem.push(new CartItem(1, product, quantity, price_total));
        localStorage.setItem("CookieCart", JSON.stringify(listCartItem));
        this.router.navigate(['/cart']);
      }
    }
  }
  getData1() {
    return this.http.get<CartItem[]>(this.urlCart).subscribe(data => this.items = data);
  }
  // lấy dữ liệu từ urlCart 
  getData(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.urlCart);
  }
  // lấy dữ liệu bời id người dùng(currentUser)
  getDataByUserId(id_User?: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.urlCart + "?id_User=" + id_User);
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
  getTotal(cartItems: CartItem[]): number {
    let total: number = 0;
    cartItems.forEach(element => {
      total += element.price_total;
    });
    return total;
  }
}

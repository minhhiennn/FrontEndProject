import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];
  currentUser: any;
  urlCart = "https://first-fucking-app-angular.herokuapp.com/cart";
  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
  }
  addToCart(product: Product){
    // nếu tìm thấy cartItem chứa product đó
    // tăng price vs quantity lên
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      this.getData().subscribe((data: CartItem[]) => {
        this.items = data;
        if (this.checkExistProduct(product) === true) {
          let num = this.getIndexExistProduct(product);
          let id: number = this.items[num].idC;
          let quantity: number = this.items[num].quantity + 1;
          let price_total: number = this.items[num].price_total + product.price;
          this.getData2(this.items[num]).subscribe(((data) => {
            let x: number = Object.values(data).length;
            for (let i = 0; i < Object.values(data).length; i++) {
              let x1: any = Object.values(data)[i];
              let key: number = x1.id;
              let product : Product = x1.product;
              if (product.id === this.items[num].product.id) {
                this.putData(key, new CartItem(id, product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
                  this.getData().subscribe((data: CartItem[]) => {
                    this.items = data;
                    this.router.navigate(['/cart']);
                  });
                });
              }
            }
          }));
        
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
  cartSync(cartItems : CartItem[]): boolean{
    this.currentUser = this.userService.getCurrentUser();
     let i : number= 0;
    let b: boolean = true;
    cartItems.forEach(element => {
      this.getData().subscribe((data: CartItem[]) => {
        this.items = data;
        if (this.checkExistProduct(element.product) === true) {
          let num = this.getIndexExistProduct(element.product);
          let id: number = this.items[num].idC;
          let quantity: number = this.items[num].quantity + 1;
          let price_total: number = this.items[num].price_total + element.product.price;
          this.getData2(this.items[num]).subscribe(((data) => {
            let x: number = Object.values(data).length;
            for (let i = 0; i < Object.values(data).length; i++) {
              let x1: any = Object.values(data)[i];
              let key: number = x1.id;
              let product: Product = x1.product;
              if (product.id === this.items[num].product.id) {
                this.putData(key, new CartItem(id, product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
                  this.getData().subscribe((data: CartItem[]) => {
                    this.items = data;
                    if (i == cartItems.length - 1) {
                      localStorage.removeItem("CookieCart");
                      this.router.navigate(['/cart']);
                    }
                  });
                });
              }
            }
          }));

        } else {
          // nếu ko tìm thấy cartItem nào
          // lấy ra id lớn nhất của cartItem + 1
          this.postData(new CartItem(this.getMaxIndexCartItem() + 1, element.product, element.quantity, element.product.price, this.currentUser?.id)).subscribe(() => {
            this.getData().subscribe((data: CartItem[]) => {
              this.items = data;
              if (i == cartItems.length - 1) {
                localStorage.removeItem("CookieCart");
                this.router.navigate(['/cart']);
              }
            });
          });
        }
      });
      
      i++;
    });
    return false;
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
      if (this.items[i].idC > maxIndex) {
        maxIndex = this.items[i].idC;
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
          let id: number = this.items[num].idC;
          let quantityy: number = this.items[num].quantity + quantity;
          let price_total: number = product.price * quantityy;
          this.getData2(this.items[num]).subscribe(((data) => {
            let x: number = Object.values(data).length;
            for (let i = 0; i < Object.values(data).length; i++) {
              let x1: any = Object.values(data)[i];
              let key: number = x1.id;
              let product: Product = x1.product;
              if (product.id === this.items[num].product.id) {
                this.putData(key, new CartItem(id, product, quantityy, price_total, this.currentUser?.id)).subscribe(response => {
                  this.getData().subscribe((data: CartItem[]) => {
                    this.items = data;
                    this.router.navigate(['/cart']);
                  });
                });
              }
            }
          }));
        
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
  getData2(cartItem: CartItem) {
    return this.http.get(this.urlCart + "?idC=" + cartItem.idC);
  }
  getData1() {
    return this.http.get(this.urlCart);
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
}

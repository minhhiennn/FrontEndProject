import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from '../../models/cart-item';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  currentUser: User | null = null;
  showSpinner: boolean = true;
  constructor(private cartService: CartService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      this.cartService.getDataByUserId(this.currentUser.id).subscribe((data: CartItem[]) => {
        this.cartItems = data;
        this.caculateCartTotal();
        this.showSpinner = false;
      });
    } else {
      //this.router.navigate(['/login']);
      let CookieCart: any = localStorage.getItem("CookieCart");
      if (CookieCart != null) {
        let listCartItem: CartItem[] = JSON.parse(CookieCart) as CartItem[];
        this.cartItems = listCartItem;
        this.caculateCartTotal();
        this.showSpinner = false;
      } else {
        let listCartItem: CartItem[] = [];
        localStorage.setItem("CookieCart", JSON.stringify(listCartItem));
        this.cartItems = listCartItem;
        this.caculateCartTotal();
        this.showSpinner = false;
      }
    }
  }
  increaseByOne(cartItem: CartItem) {
    this.showSpinner = true;
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].product.id == cartItem.product.id) {
          let quantity: number = this.cartItems[i].quantity + 1;
          let price_total: number = quantity * this.cartItems[i].product.price;
          this.cartService.getData2(cartItem).subscribe(((data) => {
            let x: number = Object.values(data).length;
            for (let i = 0; i < Object.values(data).length; i++) {             
              let x1: any = Object.values(data)[i];
              let key: number = x1.id;
              let product: Product = x1.product;
              if (product.id === cartItem.product.id) {
                this.cartService.putData(key, new CartItem(this.cartItems[i].idC, product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
                  this.cartService.getDataByUserId(this.currentUser?.id).subscribe((data: CartItem[]) => {
                    this.cartItems = data;
                    this.caculateCartTotal();
                    this.showSpinner = false;
                    this.cartService.getData1();
                  });
                });
                break;
              }
            }
           
          }));
         
          break;
        }
      }
    } else {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].product.id == cartItem.product.id) {
          let quantity: number = this.cartItems[i].quantity + 1;
          let price_total: number = quantity * this.cartItems[i].product.price;
          this.cartItems[i].quantity = quantity;
          this.cartItems[i].price_total = price_total;
          this.caculateCartTotal();
          localStorage.setItem("CookieCart", JSON.stringify(this.cartItems));
          this.showSpinner = false;
          break;
        }
      }
    }
  }
  decreaseByOne(cartItem: CartItem) {
    this.showSpinner = true;
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].product.id == cartItem.product.id) {
          if (this.cartItems[i].quantity > 1) {
            let quantity: number = this.cartItems[i].quantity - 1;
            let price_total: number = quantity * this.cartItems[i].product.price;
            this.cartService.getData2(cartItem).subscribe(((data) => {
              let x: number = Object.values(data).length;
              for (let i = 0; i < Object.values(data).length; i++) {
                let x1: any = Object.values(data)[i];
                let key: number = x1.id;
                let product: Product = x1.product;
                if (product.id === cartItem.product.id) {
                  this.cartService.putData(key,
                    new CartItem(this.cartItems[i].idC, product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
                      this.cartService.getDataByUserId(this.currentUser?.id).subscribe((data: CartItem[]) => {
                        this.cartItems = data;
                        this.caculateCartTotal();
                        this.showSpinner = false;
                        this.cartService.getData1();
                      });
                    });
                  break;
                }
              }
              
            }));
         
            break;
          } else {
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].product.id == cartItem.product.id) {
          if (this.cartItems[i].quantity > 1) {
            let quantity: number = this.cartItems[i].quantity - 1;
            let price_total: number = quantity * this.cartItems[i].product.price;
            this.cartItems[i].quantity = quantity;
            this.cartItems[i].price_total = price_total;
            this.caculateCartTotal();
            localStorage.setItem("CookieCart", JSON.stringify(this.cartItems));
            this.showSpinner = false;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  caculateCartTotal() {
    let sum: number = 0;
    this.cartItems.forEach((item: CartItem) => {
      sum += item.price_total;
    })
    this.cartTotal = sum;
  }
  change(cartItem: CartItem) {
    this.showSpinner = true;
    let inputElement = document.getElementById(cartItem.product.id.toString()) as HTMLInputElement;
    let x = inputElement.value;
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].product.id == cartItem.product.id) {
          let numberX: number = parseInt(x);
          if (numberX >= 1) {
            let quantity: number = numberX;
            let price_total = quantity * this.cartItems[i].product.price;
            this.cartService.getData2(cartItem).subscribe(((data) => {
              let x: number = Object.values(data).length;
              for (let i = 0; i < Object.values(data).length; i++) {
                let x1: any = Object.values(data)[i];
                let key: number = x1.id;
                let product: Product = x1.product;
                if (product.id === cartItem.product.id) {
                  this.cartService.putData(key,
                    new CartItem(this.cartItems[i].idC, product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
                      this.cartService.getDataByUserId(this.currentUser?.id).subscribe((data: CartItem[]) => {
                        this.cartItems = data;
                        this.caculateCartTotal();
                        this.showSpinner = false;
                        this.cartService.getData1();
                      });
                    });
                  break;
                }
              }
            }));          
          } else {
            let quantity: number = 1;
            let price_total = quantity * this.cartItems[i].product.price;
            this.cartService.getData2(cartItem).subscribe(((data) => {
              let x: number = Object.values(data).length;
              for (let i = 0; i < Object.values(data).length; i++) {
                let x1: any = Object.values(data)[i];
                let key: number = x1.id;
                let product: Product = x1.product;
                if (product.id === cartItem.product.id) {
                  this.cartService.putData(key,
                    new CartItem(this.cartItems[i].idC, product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
                      this.cartService.getDataByUserId(this.currentUser?.id).subscribe((data: CartItem[]) => {
                        this.cartItems = data;
                        this.caculateCartTotal();
                        this.showSpinner = false;
                        this.cartService.getData1();
                      });
                    });
                  break;
                }
              }
            }));          
          }
        }
      }
    } else {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].product.id == cartItem.product.id) {
          let numberX: number = parseInt(x);
          if (numberX >= 1) {
            let quantity: number = numberX;
            let price_total = quantity * this.cartItems[i].product.price;
            this.cartItems[i].quantity = quantity;
            this.cartItems[i].price_total = price_total;
            this.caculateCartTotal();
            localStorage.setItem("CookieCart", JSON.stringify(this.cartItems));
            this.showSpinner = false;
            break;
          }
        } else {
          let quantity: number = 1;
          let price_total = quantity * this.cartItems[i].product.price;
          this.cartItems[i].quantity = quantity;
          this.cartItems[i].price_total = price_total;
          this.caculateCartTotal();
          localStorage.setItem("CookieCart", JSON.stringify(this.cartItems));
          this.showSpinner = false;
          break;
        }
      }
    }
  }
  remove(cartItem: CartItem) {
    this.showSpinner = true;
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      this.cartService.getData2(cartItem).subscribe(((data) => {
        let x: number = Object.values(data).length;
        for (let i = 0; i < Object.values(data).length; i++) {
          let x1: any = Object.values(data)[i];
          let key: number = x1.id;
          let product: Product = x1.product;
          if (product.id === cartItem.product.id) {
            this.cartService.deleteData(key).subscribe(() => {
              this.cartService.getDataByUserId(this.currentUser?.id).subscribe((data: CartItem[]) => {
                this.cartItems = data;
                this.caculateCartTotal();
                this.showSpinner = false;
                this.cartService.getData1();
              });
            });
          }
        }
      }));
     
    } else {
      let index: number = this.cartItems.findIndex((cartItem: CartItem) => cartItem.product.id === cartItem.product.id);
      if (index > -1) {
        this.cartItems.splice(index, 1);
        localStorage.setItem("CookieCart", JSON.stringify(this.cartItems));
        this.showSpinner = false;
      }
      this.caculateCartTotal();
    }
  }
}

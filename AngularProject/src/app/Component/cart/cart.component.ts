import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from '../../models/cart-item';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  currentUser: User | undefined;
  showSpinner: boolean = true;    
  constructor(private cartService: CartService, private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((currentUsser: User) => {
      if (currentUsser.id != undefined) {
        this.currentUser = currentUsser;
        this.cartService.getDataByUserId(this.currentUser.id).subscribe((data: CartItem[]) => {
          this.cartItems = data;
          this.caculateCartTotal();
          this.showSpinner = false;
        });
      } else {
        this.router.navigate(['/login']);
      }
    })    
  }
  increaseByOne(cartItem: CartItem) {
    this.showSpinner = true;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id == cartItem.product.id) {
        let quantity: number = this.cartItems[i].quantity + 1;
        let price_total: number = quantity * this.cartItems[i].product.price;
        this.cartService.putData(this.cartItems[i].id,
          new CartItem(this.cartItems[i].id, this.cartItems[i].product, quantity, price_total, this.currentUser?.id)).subscribe(response => {
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
  }
  decreaseByOne(cartItem: CartItem) {
    this.showSpinner = true;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id == cartItem.product.id) {
        if (this.cartItems[i].quantity > 1) {
          let quantity: number = this.cartItems[i].quantity - 1;
          let price_total: number = quantity * this.cartItems[i].product.price;
          this.cartService.putData(this.cartItems[i].id,
            new CartItem(this.cartItems[i].id, this.cartItems[i].product, quantity, price_total, this.currentUser?.id)).subscribe(response => {
              this.cartService.getDataByUserId(this.currentUser?.id).subscribe((data: CartItem[]) => {
                this.cartItems = data;
                this.caculateCartTotal();
                this.showSpinner = false;
                this.cartService.getData1();
              });
            });
          break;
        } else {
          break;
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
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id == cartItem.product.id) {
        let numberX:number = parseInt(x);
        if (numberX >= 1) {
          let quantity: number = numberX;
          let price_total = quantity * this.cartItems[i].product.price;
          this.cartService.putData(this.cartItems[i].id,
            new CartItem(this.cartItems[i].id, this.cartItems[i].product, quantity, price_total, this.currentUser?.id)).subscribe(response => {
              this.cartService.getDataByUserId(this.currentUser?.id).subscribe((data: CartItem[]) => {
                this.cartItems = data;
                this.caculateCartTotal();
                this.showSpinner = false;
                this.cartService.getData1();
              });
            });
          break;
        } else {
          let quantity: number = 1;
          let price_total = quantity * this.cartItems[i].product.price;
          this.cartService.putData(this.cartItems[i].id,
            new CartItem(this.cartItems[i].id, this.cartItems[i].product, quantity, price_total, this.currentUser?.id)).subscribe(response => {
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
    }
    this.caculateCartTotal();
  }
  remove(cartItem: CartItem) {
    this.showSpinner = true;
    this.cartService.deleteData(cartItem.id).subscribe(response => {
      this.cartService.getDataByUserId(this.currentUser?.id).subscribe((data: CartItem[]) => {
        this.cartItems = data;
        this.caculateCartTotal();
        this.showSpinner = false;
        this.cartService.getData1();
      });
    });
  }
}

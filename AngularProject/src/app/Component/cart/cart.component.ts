import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from '../../models/cart-item';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { CourseDialogComponent } from 'src/app/component/course-dialog/course-dialog.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  listCartItemsWhenVoucher: CartItem[] = [];
  cartTotal = 0;
  currentUser: User | null = null;
  showSpinner: boolean = true;
  voucherCode: string | null = null;
  cartTotalReal: number = 0;
  image: any;
  dialogType: string = "";
  shipcost: number = 0;
  timeship: string = "";
  constructor(private cartService: CartService, private userService: UserService, private router: Router, private dialog: MatDialog, private sanitizer: DomSanitizer) { }

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
          this.cartService.putData(this.cartItems[i].id,
            new CartItem(this.cartItems[i].id, this.cartItems[i].product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
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
            this.cartService.putData(this.cartItems[i].id,
              new CartItem(this.cartItems[i].id, this.cartItems[i].product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
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
            this.cartService.putData(this.cartItems[i].id,
              new CartItem(this.cartItems[i].id, this.cartItems[i].product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
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
              new CartItem(this.cartItems[i].id, this.cartItems[i].product, quantity, price_total, this.currentUser?.id)).subscribe(() => {
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
      this.cartService.deleteData(cartItem.id).subscribe(() => {
        this.cartService.getDataByUserId(this.currentUser?.id).subscribe((data: CartItem[]) => {
          this.cartItems = data;
          this.caculateCartTotal();
          this.showSpinner = false;
          this.cartService.getData1();
        });
      });
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
  // Đây là pt khi click vào cái checkbox mở dialog
  checkVoucher(ele: HTMLInputElement) {
    if (ele.checked == true) {
      this.dialogType = "voucher";
      ele.checked = false;
      this.openDialog();
    }
  }
  // đây là pt check vào mở diaglog shipping
  getShipping(ele: HTMLInputElement) {
    if (ele.checked == true) {
      this.dialogType = "shipping";
      ele.checked = false;
      this.openDialog();
    }
  }
  // Đây là phương thức mở lớp dialog
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.maxHeight = '800px';
    dialogConfig.maxWidth = '800px';
    dialogConfig.data = {
      voucherCode: this.voucherCode,
      dialogType: this.dialogType
    };
    this.dialog.open(CourseDialogComponent, dialogConfig).afterClosed().subscribe(
      (data: any) => {
        if (data !== undefined) {
          let dialogType: any = localStorage.getItem("dialogType");
          if (dialogType == "voucher") {
            if (typeof data == "number") {
              let voucherCode: any = localStorage.getItem("voucherCode");
              this.voucherCode = voucherCode;
              let totalWhenGetVoucher: number = parseInt(data.toString());
              this.cartTotalReal = totalWhenGetVoucher;
              this.listCartItemsWhenVoucher = [];
              localStorage.removeItem("voucherCode");
            } else {
              let voucherCode: any = localStorage.getItem("voucherCode");
              this.voucherCode = voucherCode;
              let totalWhenGetVoucher: number = this.cartService.getTotal(data);
              this.cartTotalReal = totalWhenGetVoucher;
              this.listCartItemsWhenVoucher = data;
              localStorage.removeItem("voucherCode");
            }
            localStorage.removeItem("dialogType");
          } else if (dialogType == "shipping") {
            if (typeof data == "string") {
              let shipcost = parseFloat(data.split('-')[0]);
              console.log(data)
              let timeship: string = data.split('-')[1];
              this.shipcost = shipcost;
              this.timeship = timeship;
            }
            localStorage.removeItem("dialogType");
          }
        }
      }
    );
  }
}

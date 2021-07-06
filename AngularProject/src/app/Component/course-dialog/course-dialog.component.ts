import { Component, Inject, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/service/voucher.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CartItem } from '../../models/cart-item';
import { map } from 'rxjs/operators';
import { Voucher } from '../../models/voucher';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  
  data: any;
  err: string = "";
<<<<<<< HEAD
  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any, private voucherService: VoucherService) {
    this.cartItem = data.listCartItem;
    console.log(this.cartItem);
=======
  currentUser: User | null = null;

  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any, private voucherService: VoucherService, private cartService: CartService, private userService: UserService) {
    
>>>>>>> 8f9f90d82a8c873d629dbfd69d901faa6136441b
  }

  ngOnInit(): void {

  }
  close() {
    this.dialogRef.close();
  }
  test(code: HTMLInputElement) {
<<<<<<< HEAD
    this.voucherService.getByCode(code.value).pipe(map((data) => {
      if (data.length == 0) {
        return "lỗi ko tìm thấy code voucher";
      } else {
        let date1: Date = new Date(data[0].dateBegin.toString());
        let date2: Date = new Date(data[0].dateEnd.toString());
        let voucher: Voucher = new Voucher(data[0].code, data[0].quantity, data[0].type, data[0].content, data[0].condition, data[0].discount, date1, date2);
        let data2: CartItem[] | null = this.voucherService.checkCondition(voucher, this.cartItem);
        return data2;
      }
    })).subscribe(data => {
      if (data == "lỗi ko tìm thấy code voucher") {
        this.err = "lỗi ko tìm thấy code voucher";
        console.log("sai");
      } else {
        if (data == null) {
          this.err = "cái voucher này đã hết hạn";
        } else {
          let cartItemhihi: CartItem[] = data;
          this.dialogRef.close(cartItemhihi);
        }
=======
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser != null) {
      this.cartService.getDataByUserId(this.currentUser.id).subscribe((data1: CartItem[]) => {
        this.voucherService.getByCode(code.value).pipe(map((data) => {
          if (data.length == 0) {
            return "lỗi ko tìm thấy code voucher";
          } else {
            this.currentUser = this.userService.getCurrentUser();
            let date1: Date = new Date(data[0].dateBegin.toString());
            let date2: Date = new Date(data[0].dateEnd.toString());
            let voucher: Voucher = new Voucher(data[0].code, data[0].quantity, data[0].type, data[0].content, data[0].condition, data[0].discount, date1, date2);
            let data2: CartItem[] | null = this.voucherService.checkCondition(voucher, data1);
            return data2;
          }
        })).subscribe(data => {
          if (data == "lỗi ko tìm thấy code voucher") {
            this.err = "lỗi ko tìm thấy code voucher";
            console.log("sai");
          } else {
            if (data == null) {
              this.err = "cái voucher này đã hết hạn";
            } else {
              let cartItem: CartItem[] = data;
              this.dialogRef.close(cartItem);
            }
          }
        })
      
      });
    } else {
      //this.router.navigate(['/login']);
      let CookieCart: any = localStorage.getItem("CookieCart");
      if (CookieCart != null) {
        let listCartItem: CartItem[] = JSON.parse(CookieCart) as CartItem[];

      } else {
        let listCartItem: CartItem[] = [];
        localStorage.setItem("CookieCart", JSON.stringify(listCartItem));

>>>>>>> 8f9f90d82a8c873d629dbfd69d901faa6136441b
      }
    }
  }
}
  

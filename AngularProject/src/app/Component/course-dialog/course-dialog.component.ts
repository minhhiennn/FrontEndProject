import { Component, Inject, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/service/voucher.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CartItem } from '../../models/cart-item';
import { map } from 'rxjs/operators';
import { Voucher } from '../../models/voucher';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';
import { City } from '../../models/city';
import { CityService } from 'src/app/service/city.service';
@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  data: any;
  err: string = "";
  errShipping: string = "";
  voucherCode: string | null = null;
  currentUser: User | null = null;
  dialogType: string = "";
  listCity: City[] = [];
  spinning: boolean = true;

  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any, private voucherService: VoucherService, private cartService: CartService, private userService: UserService, private cityService: CityService) {
    this.dialogType = data.dialogType;
    if (this.dialogType == "voucher") {
      this.voucherCode = data.voucherCode;
    } else if (this.dialogType == "shipping") {
      this.cityService.getCovidLink().subscribe(data => {
        let x1: any = Object.values(data)[9];
        let cityArr: City[] = [];
        for (let index = 0; index < x1.length; index++) {
          let name: string = x1[index]['name'];
          let value: number = x1[index]['cases'];
          cityArr.push(new City(name, value,this.cityService.getCordianate(name)));          
        }
        this.listCity = cityArr;
        this.spinning = false;
        console.log(this.listCity);
      })
    }
  }

  ngOnInit(): void {

  }
  close() {
    this.dialogRef.close();
  }
  SaveVoucher(code: HTMLInputElement) {
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
            localStorage.setItem("voucherCode", voucher.code);
            let data2: CartItem[] | null | number = this.voucherService.checkCondition(voucher, data1);
            return data2;
          }
        })).subscribe(data => {
          if (data == "lỗi ko tìm thấy code voucher") {
            this.err = "lỗi ko tìm thấy code voucher";
            localStorage.removeItem("voucherCode");
          } else {
            if (data == null) {
              this.err = "cái voucher này đã hết hạn";
              localStorage.removeItem("voucherCode");
            } else if (Number.isInteger(data.toString()[0])) {
              let total: number = parseInt(data.toString());
              localStorage.setItem("dialogType", "voucher");
              this.dialogRef.close(total);
            } else {
              let cartItem: CartItem[] | number = data;
              localStorage.setItem("dialogType", "voucher");
              this.dialogRef.close(cartItem);
            }
          }
        })
      });
    }
  }
  SaveShipping(ele1: any, ele2: any) {
    if (ele2.value != "") {
      let x: string = (ele1.value);
      console.log(x);
      let shipcost: number = Math.round(this.cityService.getShipCost(x));
      console.log(shipcost);
      let timeship: string = this.cityService.getTime(x);
      for (let ele of this.listCity) {
        if (ele.name == x) {
          if (ele.value > 1000) {
            timeship = timeship + " (vì là covid nên sẽ giao trễ 1 2 ngày)";
            break;
          }
        }
      }
      console.log(timeship);
      let data: string = shipcost + "-" + timeship;
      localStorage.setItem("dialogType", "shipping");
      this.dialogRef.close(data);
    } else {
      this.errShipping = "Địa chỉ ko được để null";
    }
  }
}


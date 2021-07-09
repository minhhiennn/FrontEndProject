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
        this.cityService.getHeckeyLink().subscribe(data1 => {
          let x1: any = Object.values(data)[9];
          let cityArr: City[] = [];
          let x2: any = (Object.values(data1)[5])
          for (let index = 0; index < x1.length; index++) {
            for (let index1 = 0; index1 < x2.length; index1++) {
              let name: string = x2[index1]['name'];
              let value: number = x1[index]['value'];
              let hckey: number = x1[index]['hc-key'];
              let heckey: number = x2[index1]['hec-key'];
              if (hckey == heckey) {
                cityArr.push(new City(name, value, hckey, this.cityService.getCoordinate(hckey)))
              }
            }
          }
          this.listCity = cityArr;
          this.spinning = false;
          console.log(this.listCity);
        })
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
              this.dialogRef.close(total);
            } else {
              let cartItem: CartItem[] | number = data;
              this.dialogRef.close(cartItem);
            }
          }
        })
      });
    }
  }
  SaveShipping(ele: any) {
    let shipcost: number = this.cityService.getShipCost(parseInt(ele.value));
    let timeship: string = this.cityService.getTime(parseInt(ele.value));
    console.log(timeship);
  }
}
  

import { Component, Inject, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/service/voucher.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CartItem } from '../../models/cart-item';
import { map } from 'rxjs/operators';
import { Voucher } from '../../models/voucher';
@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  cartItem: CartItem[] = [];
  data: any;
  err: string = "";
  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any, private voucherService: VoucherService) {
    this.cartItem = data.listCartItem;
    console.log(this.cartItem);
  }

  ngOnInit(): void {

  }
  close() {
    this.dialogRef.close();
  }
  test(code: HTMLInputElement) {
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
      }
    })
  }
}

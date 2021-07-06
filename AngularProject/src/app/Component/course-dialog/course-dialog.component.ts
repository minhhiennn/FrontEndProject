import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { element } from 'protractor';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { VoucherService } from 'src/app/service/voucher.service';


@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  cartItems: CartItem[];

  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any, private voucherService: VoucherService,private cartService :CartService) {

    this.cartItems = data.listCartItem
  }

  ngOnInit(): void {

  }
  close() {
    this.dialogRef.close();
  }
  save(value: string) {
    console.log(value);
    this.voucherService.getByCode(value).subscribe(element => {
      element[0].dateBegin = new Date(element[0]['dateBegin']);
      element[0].dateEnd = new Date(element[0]['dateEnd']);
      let cartItems: CartItem[] | null = this.voucherService.checkCondition(element[0], this.cartItems)
      if (cartItems!= null){
        console.log(this.cartService.getTotal(cartItems));
      }

    });

    this.dialogRef.close("this is cú lừa");
  }


}

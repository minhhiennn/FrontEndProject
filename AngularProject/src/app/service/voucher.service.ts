import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { User } from '../models/user';
import { Voucher } from '../models/voucher';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  url = 'https://first-fucking-app-angular.herokuapp.com/voucher/';

  constructor(private http: HttpClient) { }

  getByCode(code: string): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.url}?code=${code}`);
  }
  checkCanUser(voucher: Voucher): boolean {
    let now = new Date();
    if (voucher.dateBegin.getTime() < now.getTime() && voucher.dateEnd.getTime() > now.getTime()) {
      if (voucher.quantity == -1) {
        return true;
      } else if (voucher.quantity > 0) return true;
    }
    return false;
  }
  checkCondition(voucher: Voucher, cartItems: CartItem[]): CartItem[] | null {
    let cartItemsN: CartItem[] = cartItems;
    if (this.checkCanUser(voucher)) {
      //Condition
      let conditionArr: string[] = voucher.condition.split("-");
      //Content
      let contentArr: string[] = voucher.content.split("-");
      //contentPrice và contentPriceMax chỉ có khi giảm giá theo giỏ hàng
      let contentPrice: number = parseInt(contentArr[0]); //lượng tiền 
      let contentPriceMax: number = parseInt(contentArr[1]); //(Số tiền tối đa được giảm giá) 
      // ba thằng ở dưới chỉ có khi giảm giá theo tên mặt hàng
      let contentAmount: number = parseInt(contentArr[2]); //số lượng 
      let contentType: number = parseInt(contentArr[3]);//loại giảm theo số lượng
      let contentAmountMax: number = parseInt(contentArr[4]);//Số lượng tối đa được giảm giá
      // 2 thằng đầu null khi giảm giá theo tên mặt hàng và ngược lại

      let total: number = 0;
      // //1-9999999-0-0-0 : 1 là lượng tiền cần đạt để được giảm giá ---- 9999999 là lượng tiền tối đa được giảm giá
      // let voucher: Voucher = new Voucher("codeTheoGio", 20, "%","1-9999999-0-0-0","null-", 10, new Date('August 19, 2020 23:15:30'), new Date('August 19, 2022 23:15:30'));
      // //0-0-1-1-9999999 : 1 là số lượng cần đạt để được giảm giá - 1 là loại giảm giá theo số lượng - 9999999 là số lượng tối đa được giảm giá
      // let voucher: Voucher = new Voucher("codeTheoTen", 20, "%", "0-0-1-1-9999999", "Easy Polo Black Edition ahihi-", 10, new Date('August 19, 2020 23:15:30'), new Date('August 19, 2022 23:15:30'));
      // giảm giá theo tên mặt hàng
      for (let index = 0; index < cartItems.length; index++) {
        if (conditionArr.includes(cartItems[index].product.name) && cartItems[index].quantity >= contentAmount) {
          cartItemsN[index].price_total = this.discountWithType(cartItems[index].product.price, contentAmountMax, contentType, voucher.type, voucher.discount, cartItems[index].quantity, contentAmount);
        }
        total += cartItemsN[index].price_total;
      }
      // giảm giá theo giỏ hàng
      if (conditionArr.includes("null") && total >= contentPrice) {
        total = this.discountWithType(total, contentPriceMax, 1, voucher.type, voucher.discount, 0, 0);
        let minus = cartItemsN[0].price_total - total;
        for (let index = 0; index < cartItemsN.length; index++) {
          if (minus <= 0)
            cartItemsN[index].price_total = Math.abs(minus)
          minus = cartItemsN[index].price_total - minus
        }
      }
      return cartItemsN
    }
    return null;
  }

  discountWithType(total: number, contentPriceMaxOrAmountMax: number, contentType: number, type: string, discount: number, quantity: number, contentAmount: number): number {
    if (type == "%") {
      discount = (total * discount) / 100;
    }
    let result = 0;
    switch (contentType) {
      case 1:
        //quantity > 0 la tk giảm giá theo mặt hàng còn = 0 là giảm giá theo giỏ hàng và giảm giá theo giỏ hàng thì contentType luôn là 1
        if (quantity > 0) {
          if (quantity >= contentPriceMaxOrAmountMax && contentPriceMaxOrAmountMax != 0) result = (total * quantity) - ((discount) * contentPriceMaxOrAmountMax);
          else result = (total - discount) * quantity;
        } else {
          result = total - discount;
          if (result >= contentPriceMaxOrAmountMax && contentPriceMaxOrAmountMax != 0) result = contentPriceMaxOrAmountMax;
        }
        break;
      case 2:
        if (quantity >= contentPriceMaxOrAmountMax && contentPriceMaxOrAmountMax != 0) result = (total * quantity) - ((discount) * (contentPriceMaxOrAmountMax - contentAmount));
        else result = (total - discount) * (quantity - contentAmount);
        break;
      default:
        break;
    }
    return result;
  }
}

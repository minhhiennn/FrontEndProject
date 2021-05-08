import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { ProductService } from 'src/app/service/product.service';
import { CartItem } from '../../models/cart-item';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;

  constructor(private messageService: MessageService, private productService: ProductService) { }

  ngOnInit(): void {
    //this.messageService.getMessage().subscribe((product: any) => {
    //  console.log(product);
    //  this.cartItems.push({ id: product.id, name: product.name });
    //}
    this.cartItems = this.messageService.getItem();
    this.caculateCartTotal();
  }
  increaseByOne(productId: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].getProduct().getId() == productId) {
        this.cartItems[i].setQuantity(this.cartItems[i].getQuantity() + 1);
        this.cartItems[i].setPriceTotal(this.cartItems[i].getQuantity() * this.cartItems[i].getProduct().getPrice());
        break;
      }
    }
    this.caculateCartTotal();
  }
  decreaseByOne(productId: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].getProduct().getId() == productId) {
        if (this.cartItems[i].getQuantity() > 1) {
          
          this.cartItems[i].setQuantity(this.cartItems[i].getQuantity() - 1);
          this.cartItems[i].setPriceTotal(this.cartItems[i].getQuantity() * this.cartItems[i].getProduct().getPrice());
          break;
        } else {
          break;
        }
      }
    }
    this.caculateCartTotal();
  }
  caculateCartTotal() {
    let sum: number = 0;
    this.cartItems.forEach((item: CartItem) => {
      sum += item.getPriceTotal();
    })
    this.cartTotal = sum;
  }
  change(productId: number) {
    let inputElement = document.getElementById(productId.toString()) as HTMLInputElement;
    let x = inputElement.value;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].getProduct().getId() == productId) {
        let numberX:number = parseInt(x);
        if (numberX >= 1) {
          this.cartItems[i].setQuantity(numberX);
          this.cartItems[i].setPriceTotal(this.cartItems[i].getQuantity() * this.cartItems[i].getProduct().getPrice());
          break;
        } else {
          this.cartItems[i].setQuantity(1);
          inputElement.value = this.cartItems[i].getQuantity().toString();
          this.cartItems[i].setPriceTotal(this.cartItems[i].getQuantity() * this.cartItems[i].getProduct().getPrice());
          break;
        }
      }
    }
    this.caculateCartTotal();
  }
  remove(productId: number) {
    let index: number = this.cartItems.findIndex((cartItem: CartItem) => cartItem.getProduct().getId() === productId);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.caculateCartTotal();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-shop-list-product',
  templateUrl: './shop-list-product.component.html',
  styleUrls: ['./shop-list-product.component.css']
})
export class ShopListProductComponent implements OnInit {
  //process bar
  options = {
    minimum: 0.08,
    maximum: 1,
    ease: 'linear',
    speed: 200,
    trickleSpeed: 300,
    meteor: true,
    spinner: true,
    spinnerPosition: 'right',
    direction: 'leftToRightIncreased',
    color: 'red',
    thick: true
  };
  preventAbuse = false;
  @Input() productItem: any;
  constructor(private cartService: CartService) { }
  handleAddToCart() {
    this.cartService.addToCart(this.productItem);
    this.preventAbuse = true;
  }
  ngOnInit(): void {

  }
}

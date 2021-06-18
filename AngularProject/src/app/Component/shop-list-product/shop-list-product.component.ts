import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-shop-list-product',
  templateUrl: './shop-list-product.component.html',
  styleUrls: ['./shop-list-product.component.css']
})
export class ShopListProductComponent implements OnInit {

  @Input() productItem: any;
  constructor(private cartService: CartService) { }
  handleAddToCart() {
    this.cartService.addToCart(this.productItem);
  }
  ngOnInit(): void {
  }
}

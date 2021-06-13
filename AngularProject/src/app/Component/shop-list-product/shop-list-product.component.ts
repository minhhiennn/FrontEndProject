import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shop-list-product',
  templateUrl: './shop-list-product.component.html',
  styleUrls: ['./shop-list-product.component.css']
})
export class ShopListProductComponent implements OnInit {

  @Input() productItem: any;
  constructor(private cartService: CartService, private router: Router) { }
  handleAddToCart() {
    this.cartService.addToCart(this.productItem);
    setTimeout(() => { this.router.navigate(['/cart']);},500)
  }
  ngOnInit(): void {
  }
}

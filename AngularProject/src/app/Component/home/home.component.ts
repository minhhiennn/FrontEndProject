import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
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
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getData().subscribe(data => this.products = data);
  }
  handleAddToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log(product);
    this.preventAbuse = true;
  }
}

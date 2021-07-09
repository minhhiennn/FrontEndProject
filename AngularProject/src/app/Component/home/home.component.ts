import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { CityService } from 'src/app/service/city.service';
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
  constructor(private productService: ProductService, private cartService: CartService,private cityService:CityService) { }

  ngOnInit(): void {
    this.productService.getData().subscribe(data => this.products = data);
    
    console.log(this.cityService.splitCor("10.828972309568254,106.68173480324562"))
  }
  handleAddToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log(product);
    this.preventAbuse = true;
  }
}

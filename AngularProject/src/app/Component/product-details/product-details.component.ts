import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from '../../models/product';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private router: Router) { }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.queryParamMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that correspond with the id provided in route.
    this.product = this.productService.products.find(product => product.id === productIdFromRoute);
  }
  change(input: any) {
    let num = Number(input.value);
    if (num < 1) {
      input.value = 1;
    }    
  }
  getProductAndQuantity(input: any, product: Product) {
    let quantity: number = Number(input.value);
    this.cartService.getProductAndQuantity(quantity, product);
    this.router.navigate(['/cart']);
  }
}

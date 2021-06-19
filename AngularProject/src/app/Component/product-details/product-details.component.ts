import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from '../../models/product';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.queryParamMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    // Find the product that correspond with the id provided in route.
    this.productService.getSingleProduct(productIdFromRoute).subscribe(product => {
      this.product = product;
    })
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
  }
}

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  pageNumber: number = 9;
  start: number = 0;
  end: number = 5;
  products: Product[] = [];
  p: number = 1;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.queryParamMap;
    const stringSearch = routeParams.get('search');
    const priceRange = routeParams.get('priceRange');
    if (stringSearch == null && priceRange != null) {
        this.products = this.productService.getProductsByPriceRange(priceRange);
    } else if (stringSearch != null && priceRange == null) {
        this.products = this.productService.getProductsByName(stringSearch);
    } else if (stringSearch == null && priceRange == null){
        this.products = this.productService.getProducts();
    }
    
  }

  onClick2(p : number) {
    
    this.p = p;
    console.log(p)
    this.start = (p -1) *5 
    this.end = this.start + 5;
    this.ngOnInit()
  }
}

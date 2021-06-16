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
  end: number = 9;
  products: Product[] = [];
  p: number = 1;
  showSpinner: boolean = true;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.queryParamMap;
    const stringSearch = routeParams.get('search');
    const priceRange = routeParams.get('priceRange');
    if (stringSearch == null && priceRange != null) {
      this.getListProductByPriceRange(priceRange);
    } else if (stringSearch != null && priceRange == null) {
      this.getListProductByName(stringSearch);
    } else if (stringSearch == null && priceRange == null) {
      this.getListProduct();
    }
  }

  onClick2(p: number) {
    if (p == 1) {
      this.p = p;
      this.start = 0;
      this.end = 9;
    } else {
      this.p = p;
      this.start = (this.p - 1) * this.pageNumber;
      this.end = this.start + 9;
    }
  }
  getListProduct() {
    this.productService.getData().subscribe((data) => {
      this.products = data;
      this.showSpinner = false;
    });
  }
  getListProductByName(name: string) {
    this.productService.getData().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(name.toLowerCase())) {
          this.products.push(data[i]);
        }
      }
      this.showSpinner = false;
    });
  }
  getListProductByPriceRange(priceRange: string) {
    this.productService.getData().subscribe((data) => {
      let stringSlipt: string[] = priceRange.split('-');
      let min: number = Number(stringSlipt[0]);
      let max: number = Number(stringSlipt[1]);
      for (let i = 0; i < data.length; i++) {
        if (data[i].price >= min && data[i].price <= max) {
          this.products.push(data[i]);
        }
      }
      this.showSpinner = false;
    });
  }
}

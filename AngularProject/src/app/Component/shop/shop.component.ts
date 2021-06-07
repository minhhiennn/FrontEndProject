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
  pageActive: number = 1;
  i2: number = 1;
  sizeS: number[] = [];
  size: number = 0;
  pageNumber: number = 9;
  start: number = 0;
  end: number = 9;
  products: Product[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const stringSearch = routeParams.get('stringSearch');
    if (stringSearch == null) {
      this.products = this.productService.getProducts();
    } else {
      this.products = this.productService.getProductsByName(stringSearch);
    }
    console.log(stringSearch);
    this.size = this.caculatePage();
    this.getSizeS();
  }

  countAllProduct(): number {
    return this.products.length;
  }
  caculatePage(): number {
    if (this.countAllProduct() % this.pageNumber == 0) {
      return Math.floor(this.countAllProduct() / this.pageNumber);
    } else {
      return Math.floor(this.countAllProduct() / this.pageNumber) + 1;
    }
  }
  getSizeS() {
    for (let i = 1; i <= this.size; i++) {
      this.sizeS.push(i);
    }
  }
  onClick(i: number) {
    if (i == 1) {
      this.start = 0;
      this.end = 9;
      this.pageActive = 1;
      this.i2 = 1;
    } else {
      this.start = ((this.pageNumber+1) * i) - 10;
      this.end = ((this.pageNumber + 1) * i) - 1;
      this.pageActive = i;
      this.i2 = i;
    }
  }
  isActive(i: number) {
    if (this.pageActive === i) {
      return true;
    } else {
      return false;
    }
  }
  onClick2() {
    this.i2++;
    if (this.i2 <= this.caculatePage()) {
      this.start = ((this.pageNumber + 1) * this.i2) - 10;
      this.end = ((this.pageNumber + 1) * this.i2) - 1;
      this.pageActive = this.i2;
    }
  }
}

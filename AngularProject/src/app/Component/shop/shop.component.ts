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
      this.start = ((this.pageNumber + 1) * this.p) - 10;
      this.end = ((this.pageNumber + 1) * this.p) - 1;
    }
  }
  getListProduct() {
    this.productService.getData().subscribe((data) => {
      let x: number = Object.values(data).length;
      for (let i = 0; i < Object.values(data).length; i++) {
        let x1: any = Object.values(data)[i];
        let product: Product = new Product(x1.id, x1.price, x1.name, x1.img);
        this.products.push(product);
      }
      this.showSpinner = false;
    });
  }
  getListProductByName(name: string) {
    this.productService.getData().subscribe((data) => {
      let productList: Product[] = [];
      for (let i = 0; i < Object.values(data).length; i++) {
        let x1: any = Object.values(data)[i];
        let product: Product = new Product(x1.id, x1.price, x1.name, x1.img);
        productList.push(product);
      }
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].getName().toLowerCase().includes(name.toLowerCase())) {
          this.products.push(productList[i]);
        }
      }
      this.showSpinner = false;
    });
  }
  getListProductByPriceRange(priceRange: string) {
    this.productService.getData().subscribe((data) => {
      let productList: Product[] = [];
      let stringSlipt: string[] = priceRange.split('-');
      let min: number = Number(stringSlipt[0]);
      let max: number = Number(stringSlipt[1]);
      for (let i = 0; i < Object.values(data).length; i++) {
        let x1: any = Object.values(data)[i];
        let product: Product = new Product(x1.id, x1.price, x1.name, x1.img);
        productList.push(product);
      }
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].getPrice() >= min && productList[i].getPrice() <= max) {
          this.products.push(productList[i]);
        }
      }
      this.showSpinner = false;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.css']
})
export class BlogSingleComponent implements OnInit {

  name = 'Set iframe source';
  url: string = "https://www.itailor.com/designsuits/";
  imagePath: string = "";
  urlSafe: SafeResourceUrl;
  constructor(public sanitizer: DomSanitizer, private cartService: CartService,) {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


  ngOnInit(): void {

  }
  post() {
    //measure la thong tin so do cua khach hang
    console.log(JSON.parse(localStorage.getItem("measure") as any))
    //iTailorObject la thong tin chat vai
    console.log(JSON.parse(localStorage.getItem("iTailorObject") as any))
    //vestObject la thong tin cai ao
    console.log(JSON.parse(localStorage.getItem("vestObject") as any))
    //pantObject la thong tin cai quan
    console.log(JSON.parse(localStorage.getItem("pantObject") as any))
    //sumExtra la gia
    console.log(JSON.parse(localStorage.getItem("sumExtra") as any))

    //hai cai cuoi nay la base64 lay hinh cua cai ao vest voi cai quan

    console.log(JSON.parse(localStorage.getItem("pant") as any))
    console.log(JSON.parse(localStorage.getItem("vest") as any))
    this.imagePath = localStorage.getItem("#jacket-front") as string

    let product: Product = new Product(-2, JSON.parse(localStorage.getItem("sumExtra") as any), "do custom", (this.imagePath));
    this.cartService.addToCart(product);
  }
}

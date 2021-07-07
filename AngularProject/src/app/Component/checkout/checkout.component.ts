import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
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
  
  
    //hai cai cuoi nay la base64 lay hinh cua cai ao vest voi cai quan

 
    this.imagePath = localStorage.getItem("#jacket-front") as string

    let product: Product = new Product(-2, JSON.parse(localStorage.getItem("sumExtra") as any), "do custom", (this.imagePath));
    this.cartService.addToCart(product);
  }
}

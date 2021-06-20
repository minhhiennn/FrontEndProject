import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
=======
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';

>>>>>>> 0114d4c88c86a81d9122bbbc9e213a665521cbae
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
<<<<<<< HEAD
  content: string = "";
  api: string = "https://api.rss2json.com/v1/api.json?rss_url=";
  url: string = "https://garrisonbespoke.com/feed";
  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.httpClient.get(this.api + this.url).subscribe(data => {
      let x1: any = Object.values(data)[2];
      for (let index = 0; index < x1.length; index++) {
        if (x1[index].title == ("Know Your Fabrics"))
          this.content = x1[index].content
      }
    });
  }
=======
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
>>>>>>> 0114d4c88c86a81d9122bbbc9e213a665521cbae
}


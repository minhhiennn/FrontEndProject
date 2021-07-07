import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent implements OnInit {
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

    var measure: string = JSON.stringify(JSON.parse(localStorage.getItem("measure") as any))
    var iTailorObject: string = JSON.stringify(JSON.parse(localStorage.getItem("iTailorObject") as any))
    var vestObject: string = JSON.stringify(JSON.parse(localStorage.getItem("vestObject") as any))
    var pantObject: string = JSON.stringify(JSON.parse(localStorage.getItem("pantObject") as any))


    var imagePath1 = localStorage.getItem("#jacket-front") as string
    var imagePath2 = localStorage.getItem("#jacket-back") as string
    var imagePath3 = localStorage.getItem("#pant-front") as string
    var imagePath4 = localStorage.getItem("#pant-back") as string
    var conc = imagePath1 + '$' + imagePath2 + '$' + imagePath3 + '$' + imagePath4;
    
    var nameConc = measure + '$' + (iTailorObject) + '$' + (vestObject) + '$' + (pantObject);
    let product: Product = new Product(-2, JSON.parse(localStorage.getItem("sumExtra") as any), nameConc, (conc));
    this.cartService.addToCart(product);
  }
}

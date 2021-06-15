import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  url = 'http://localhost:3000/cart';
  dataPost2 = {
    "product": {
      "id": 2,
      "price": 56,
      "name": "Easy Polo Black Edition ahihi",
      "img": "assets/images/home/product1.jpg"
    },
    "quantity": 1000,
    "priceTotal": 1555
  }
  cart: CartItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.http.get(this.url).subscribe(((data) => {
    //  let x: number = Object.values(data).length;
    //  console.log(x);
    //  for (let i = 0; i < Object.values(data).length; i++) {
    //    let x1: any = Object.values(data)[i];
    //    let user: User = new User(x1.id, x1.name, x1.email, x1.password);
    //    this.config.push(user);
    //  }
    //}));
    // this.http.post(this.url, this.dataPost).subscribe(data => console.log(data));
    //this.http.patch(this.url + "/" + 1, JSON.stringify({ isRead: true })).subscribe(data => console.log(data));
    //this.http.put(this.url + "/" + 1, this.postData).subscribe(data => { this.config = data; console.log(data) });
    //let country: Country | null = null;
    //for (let i = 0; i < countries.length; i++) {
    //  country = new Country(countries[i].name, countries[i].code);
    //  this.config.push(country);
    //}
    //this.http.post(this.url, new CartItem(new Product(1, 56, "Easy Polo Black Edition ahihi", "assets/images/home/product1.jpg"), 1000, 155)).subscribe((data) => console.log(data));
    this.http.get<CartItem[]>(this.url).subscribe((data: CartItem[]) => {
      this.cart = data;
      console.log(this.cart[6].id);
    });
    //this.http.delete(this.url + "/6").subscribe();
  }
}
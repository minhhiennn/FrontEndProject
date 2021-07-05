import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  url = 'https://garrisonbespoke.com/feed';
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
  user: User[] = [];

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
    //this.http.delete(this.url + "/6").subscribe();
    //this.http.get(this.url,
    //  {
    //    headers: new HttpHeaders({
    //      'Accept': 'application/xml',
    //    }),
    //    responseType: 'text'
    //  })
    //  .subscribe((data) => {
    //    // parse to XML content
    //    let parser = new DOMParser();
    //    let xml = parser.parseFromString(data, "text/xml");
    //    let itemsArr = xml.getElementsByTagName('item');
    //    for (let i = 0; i < 3; i++) {
    //      let dateAndTime: string = itemsArr[i].getElementsByTagName('pubDate')[0].innerHTML;
    //      let date = dateAndTime.slice(4, 16);
    //      let time = dateAndTime.slice(16, 22);
    //      let title: string = itemsArr[i].getElementsByTagName('title')[0].innerHTML;
    //      let content: any = itemsArr[i].getElementsByTagName('content:encoded')[0].textContent;
    //      let html = parser.parseFromString(content, "text/html");
    //      let imgUrl = html.getElementsByTagName('figure')[1].getElementsByTagName('img')[0].src;
    //      let description = html.getElementsByTagName('p')[1].innerHTML;
    //      console.log(description + " " + imgUrl);
    //    }
    //});
    let date: Date = new Date();
    console.log(date);
  }
}

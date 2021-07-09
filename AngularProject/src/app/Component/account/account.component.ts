//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  soduong: number = 5;
  // saleData: any[] = [];
  url = 'https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST?fbclid=IwAR1QzZtyoDFjvR8bXYPYNZE2ieNnGr02wSyRfm3fiu0NIpvsCUmd76jCSlg';
  constructor(private http: HttpClient) { }
  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];
  ngOnInit(): void {
   this.getData7().subscribe(data =>{
this.saleData=data.detail;
console.log(data.detail);

   });
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
    //let date: Date = new Date();
    //let date2: Date = new Date("01/01/2021");
    //if (date2 < date) {
    //  console.log("true");
    //} else {
    //  console.log("false");
    //}
  }
  getData7(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}

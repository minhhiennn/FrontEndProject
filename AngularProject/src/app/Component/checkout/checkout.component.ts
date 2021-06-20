import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
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
}


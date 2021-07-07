import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Rss } from 'src/app/models/rss-item';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  api: string = "https://api.rss2json.com/v1/api.json?rss_url=";
  url: string = "https://garrisonbespoke.com/feed"
  linkArr: Rss[] = []
  p: number = 1;
  total: number = 0;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get(this.api + this.url).subscribe(data => {
      let x1: any = Object.values(data)[2];
      this.total = x1.length;
      for (let index = 0; index < x1.length; index++) {
        if (index >= (this.p - 1) * 3 && index < ((this.p - 1) * 3) + 3) {
          this.linkArr.push(new Rss(x1[index].author, x1[index].content, x1[index].description, x1[index].link, x1[index].pubDate, x1[index].thumbnail, x1[index].title));
          console.log(x1[index].pubDate);
        }
      }
    });

  }
  pagination(pageNow: number) {
    this.p = pageNow;
    this.linkArr = [];
    this.ngOnInit();
    this.scrollToTop();
  }
  scrollToTop() {
    window.scroll(0, 0);
  }
}


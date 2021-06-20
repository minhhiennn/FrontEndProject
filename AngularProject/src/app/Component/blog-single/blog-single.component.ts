import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.css']
})
export class BlogSingleComponent implements OnInit {
  api: string = "https://api.rss2json.com/v1/api.json?rss_url=";
  url: string = "https://garrisonbespoke.com/feed"
  date: any;
  time: any;
  author: any;
  title: any;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }
  content: string = "";
  ngOnInit(): void {
    const routeParams = this.route.snapshot.queryParamMap;
    const productIdFromRoute = (routeParams.get('rssTitle'));
    this.httpClient.get(this.api + this.url).subscribe(data => {
      let x1: any = Object.values(data)[2];
      for (let index = 0; index < x1.length; index++) {
        if (x1[index].title == (productIdFromRoute)) {
          this.content = x1[index].content;
          this.title = x1[index].title;
          this.author = x1[index].author;
          this.date = x1[index].pubDate.slice(0, 10);
          this.time = x1[index].pubDate.slice(11);
          break;
        }
      }
    });
  }
}

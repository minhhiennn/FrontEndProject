import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
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
  content2: any;
  ngOnInit(): void {

    this.httpClient.get('https://www.24h.com.vn/tin-tuc-trong-ngay/sang-21-6-them-47-ca-mac-covivd-19-tphcm-co-so-ca-nhieu-nhat-c46a1263376.html', { responseType: 'text' }).subscribe(data => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(data, "text/html");      
      var elements = doc.querySelectorAll("*");
      var classArray = [];
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].className == "enter-24h-cate-article") {
          classArray.push(elements[i].innerHTML)
        }
      }
      this.content2 = classArray.toString();

    })
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

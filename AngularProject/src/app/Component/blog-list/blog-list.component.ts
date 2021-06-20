import { Component, OnInit } from '@angular/core';
import { RssfeedService } from 'src/app/service/rssfeed.service';
import { ItemFeed } from 'src/app/models/item-feed';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  pageNumber: number = 3;
  start: number = 0;
  end: number = 3;
  p: number = 1;
  items: ItemFeed[] = [];

  constructor(private rss: RssfeedService) {
  }

  ngOnInit(): void {
    this.rss.getData().subscribe((data) => {
      let itemss: ItemFeed[] = [];
      // parse to XML content
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xhtml+xml");
      let itemsArr = xml.getElementsByTagName('item');
      for (let i = 0; i < 7; i++) {
        this.getItem(itemsArr[i], itemss);
      }
      this.items = itemss;
      console.log(this.items);
    });
  }
  getItem(element: any, itemss: ItemFeed[]) {
    let dateAndTime = element.getElementsByTagName('pubDate')[0].innerHTML;
    let date = dateAndTime.slice(4, 16);
    let time = dateAndTime.slice(16, 22);
    let title: string = element.getElementsByTagName('title')[0].innerHTML;
    let content: any = element.getElementsByTagName('content:encoded')[0].textContent;
    // parse to HTML content
    let parser = new DOMParser();
    let html = parser.parseFromString(content, "text/html");
    let imgUrl = html.getElementsByTagName('figure')[0].getElementsByTagName('img')[0].src;
    let description = html.getElementsByTagName('p')[0].innerHTML;
    itemss.push(new ItemFeed(date, time, title, imgUrl, description));
  }
  onClick2(p: number) {
    if (p == 1) {
      this.p = p;
      this.start = 0;
      this.end = 3;
    } else {
      this.p = p;
      this.start = (this.p - 1) * this.pageNumber;
      this.end = this.start + 3;
    }
  }
}

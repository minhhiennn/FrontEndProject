import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  soduong: number = 5;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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
  }
}

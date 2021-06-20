import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemFeed } from 'src/app/models/item-feed';
@Injectable({
  providedIn: 'root'
})
export class RssfeedService {
  urlFeed = "https://garrisonbespoke.com/feed";
  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get(this.urlFeed,
      {
        headers: new HttpHeaders({
          'Accept': 'application/xml',
        }),
        responseType: 'text'
      });
  }
}

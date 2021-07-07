import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

declare var videojs: any;

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.css']
})
export class BlogSingleComponent implements OnInit, AfterViewInit {
  
  api: string = "https://api.rss2json.com/v1/api.json?rss_url=";
  url: string = "https://garrisonbespoke.com/feed"
  date: any;
  time: any;
  author: any;
  title: any;
  player: any;
  gameData: ReplaySubject<any> = new ReplaySubject(1);
  content: string = "";
  content2: any;
  videoLink: string = "";
  object: any;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.gameData.subscribe((val: any) => {
        this.player = videojs(document.getElementById('video-player'), {
          sources: {
            src: "https://cdn.24h.com.vn/upload/2-2021/videoclip/2021-06-21/1624243784-tau.m3u8",
            type: "application/x-mpegURL"
          },
        }, function onPlayerReady() { })
      });
    }, 3000);
  }
 
  

  ngOnInit(): void {
    // this.httpClient.get('https://www.24h.com.vn/tin-tuc-trong-ngay/can-canh-doan-tau-so-4-cua-metro-so-1-dua-ve-depot-long-binh-tp-thu-duc-c46a1263440.html', { responseType: 'text' }).subscribe(data => {
    //   let parser = new DOMParser();
    //   let doc = parser.parseFromString(data, "text/html");
    //   var elements = doc.querySelectorAll("*");
    //   var classArray = [];
    //   for (var i = 0; i < elements.length; i++) {
    //     var arr = elements[i].getElementsByTagName("script")
    //     for (let index = 0; index < arr.length; index++) {
    //       if (arr[index].getAttribute("type") == "application/ld+json") {
    //         for (const line of arr[index].innerHTML.split(/[\r\n]+/)) {
    //           if (line.includes("contentUrl"))
    //             this.videoLink = line.split('"')[3]
    //           if (this.videoLink.length > 10) {
    //             console.log(this.videoLink)
    //             this.gameData.next(this.videoLink);
    //             break;
    //           }
    //           console.log(this.videoLink)
    //         }
    //       }
    //     }
    //     if (elements[i].className == "enter-24h-cate-article") {
    //       for (let index = 1; index < elements[i].getElementsByClassName("news-image").length; index++) {
    //         elements[i].getElementsByClassName("news-image")[index].setAttribute("src",
    //           elements[i].getElementsByClassName("news-image")[index].getAttribute("data-original") as string)
    //       }
    //       if (elements[i].getElementsByClassName("v-24h-media-player")) {
    //         const newItem = document.createElement('video');
    //         newItem.setAttribute("id", "video-player")
    //         newItem.setAttribute("src", "video-player")
    //         newItem.setAttribute("class", "video-js")
    //         newItem.setAttribute("controls", "")
    //         this.object = doc.getElementsByClassName('v-24h-media-player')[0];
    //         console.log(newItem)
    //         this.object.parentNode.replaceChild(newItem, this.object);
    //       }
    //       classArray.push(((elements[i].innerHTML)))          
    //     }
    //   }

    //   this.content2 = this.sanitizer.bypassSecurityTrustHtml((classArray.toString()));
      
    // })
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

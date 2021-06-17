import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  name = 'Set iframe source';
  url: string = "https://www.itailor.com/designsuits/";
  urlSafe: SafeResourceUrl;
  constructor(public sanitizer: DomSanitizer) {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  
  ngOnInit(): void {
    
  }
  post(){
    //measure la thong tin so do cua khach hang
    console.log(JSON.parse(localStorage.getItem("measure") as any) )
    //iTailorObject la thong tin chat vai
    console.log(JSON.parse(localStorage.getItem("iTailorObject") as any))
    //vestObject la thong tin cai ao
    console.log(JSON.parse(localStorage.getItem("vestObject") as any))
    //pantObject la thong tin cai quan
    console.log(JSON.parse(localStorage.getItem("pantObject") as any))
    //sumExtra la gia
    console.log(JSON.parse(localStorage.getItem("sumExtra") as any))

    //hai cai cuoi nay la base64 lay hinh cua cai ao vest voi cai quan
    console.log(JSON.parse(localStorage.getItem("vest") as any))
    console.log(JSON.parse(localStorage.getItem("pant") as any))
  }

}

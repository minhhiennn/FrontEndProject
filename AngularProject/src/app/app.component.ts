import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  title = 'ProjectFrontEnd';
  constructor() { }
  onActivate(event: any) {
    //let scrollToTop = window.setInterval(() => {
    //  let pos = window.pageYOffset;
    //  if (pos > 0) {
    //    window.scrollTo(0, pos - 60); // how far to scroll on each step
    //  } else {
    //    window.clearInterval(scrollToTop);
    //  }
    //}, 16);
    window.scroll(0, 0);
  }
}

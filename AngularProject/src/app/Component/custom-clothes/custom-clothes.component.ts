import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-custom-clothes',
  templateUrl: './custom-clothes.component.html',
  styleUrls: ['./custom-clothes.component.css']
})
export class CustomClothesComponent implements OnInit {

  information: string | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  test(btn: any) {
    let div_container = document.getElementById("div-container") as HTMLElement;
    if (btn.id == "btn1") {
      let x = document.getElementById("btn1-choose-id") as HTMLElement;
      x.hidden = false;
      div_container.classList.add("disable-div-container");
    }
  }
  exitOverflowDiv() {
    let div_container = document.getElementById("div-container") as HTMLElement;
    let x = document.getElementById("btn1-choose-id") as HTMLElement;
    x.hidden = true;
    div_container.classList.remove("disable-div-container");
  }
  select(divElement: HTMLElement) {
    let div = document.getElementById("div-btn1") as HTMLElement;
    let div2 = document.getElementById("content1") as HTMLElement;
    // p price là div thứ 1
    let price = div2.children[1];
    this.information = price.innerHTML;
    console.log(this.information);
    div.removeChild(document.getElementById("btn1") as HTMLElement);
    let imgUrl: string = divElement.getElementsByTagName("img")[0].src;
    let newDiv: HTMLElement = document.createElement("div");
    let newImg: HTMLElement = document.createElement("img");
    newDiv.className = "choose-item-details";
    newImg.setAttribute('src', imgUrl);
    newImg.style.width = '100px';
    newImg.style.height = '80px';
    newDiv.appendChild(newImg);
    div.appendChild(newDiv);
    let div_container = document.getElementById("div-container") as HTMLElement;
    let x = document.getElementById("btn1-choose-id") as HTMLElement;
    x.hidden = true;
    div_container.classList.remove("disable-div-container");
  }
  deleteAll() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/custom-clothes']);
  }
}

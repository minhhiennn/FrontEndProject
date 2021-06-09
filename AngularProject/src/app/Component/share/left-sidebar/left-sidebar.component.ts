import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  SearchByPrice() {
    let priceRange: string = this.value + "-" + this.highValue;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/shop'], { queryParams: { priceRange: priceRange } }));
  }
}

import { Component, OnInit } from '@angular/core';
import { products } from '../products';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products = products;
  constructor() { }

  ngOnInit(): void {
  }

}

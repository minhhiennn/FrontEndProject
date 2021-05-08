import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-shop-list-product',
  templateUrl: './shop-list-product.component.html',
  styleUrls: ['./shop-list-product.component.css']
})
export class ShopListProductComponent implements OnInit {

  @Input() productItem: any;
  constructor(private messageService: MessageService) { }
  handleAddToCart() {
    //this.messageService.sendMessage(this.productItem);
    console.log(this.productItem);
    this.messageService.addToCart(this.productItem);
  }
  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from '../../models/product';
import { CartService } from 'src/app/service/cart.service';
import { ThrowStmt } from '@angular/compiler';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  options = {
    minimum: 0.08,
    maximum: 1,
    ease: 'linear',
    speed: 200,
    trickleSpeed: 300,
    meteor: true,
    spinner: true,
    spinnerPosition: 'right',
    direction: 'leftToRightIncreased',
    color: 'red',
    thick: true
  };
  panelOpenState = false;
  preventAbuse = false;
  currentUser: User | null = null;
  product: Product | undefined;
  measure: string[] = [];
  iTailorObject: string[] =[];
  vestObject: string[] = [];
  pantObject: string[] = []
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private userService: UserService) { }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.queryParamMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    if (productIdFromRoute < 0){
      this.currentUser = this.userService.getCurrentUser();
      if (this.currentUser != null) {
        this.cartService.getDataByUserId(this.currentUser.id).subscribe(data => data.forEach(element => {
          if (element.product.id == productIdFromRoute){
            this.product = element.product;
            this.measure = this.listTrans(element.product.name.split('$')[1].split('{'),"measure")
            this.iTailorObject = this.listTrans(element.product.name.split('$')[2].split('{'), "iTailorObject")
            this.vestObject = this.listTrans(element.product.name.split('$')[3].split('{'), "vestObject")
            this.pantObject = this.listTrans(element.product.name.split('$')[4].split('{'), "pantObject")
          }
        }))
      }else{
      }

    }else{
      this.productService.getSingleProduct(productIdFromRoute).subscribe(product => {
        this.product = product;
      })
    }
      // Find the product that correspond with the id provided in route.
  
  } 
  listTrans(list: string[], type: string): string[] {
    let list1 :string[] = [];
    for (let i = 0; i < list.length; i++) {
      let list2: string[] = list[i].replace(/[^a-zA-Z-0-9-.]/g, " ").split(' ');
      for (let i1 = 0; i1 < list2.length; i1++) {
        if (list2[i1].length > 0) list1.push(list2[i1])
      }
      list1.push('$')
    }
    let list1b: string[] = [];
    for (let i3 = 0; i3 < list1.length - 1; i3++) {
      if((i3 %2)) {
        if (list1[i3 + 1] == '$') list1b.push(list1[i3] )
        else list1b.push(list1[i3] + ": " + list1[i3 + 1])
      }
   
    }
    
    return list1b;
  }
  change(input: any) {
    let num = Number(input.value);
    if (num < 1) {
      input.value = 1;
    }    
  }
  getProductAndQuantity(input: any, product: Product) {
    this.preventAbuse = true;
    let quantity: number = Number(input.value);
    this.cartService.getProductAndQuantity(quantity, product);
  }
}

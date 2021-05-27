import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './Component/cart/cart.component';
import { BlogComponent } from './Component/blog/blog.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { ContactUsComponent } from './Component/contact-us/contact-us.component';
import { IndexComponent } from './Component/index/index.component';
import { LoginComponent } from './Component/login/login.component';
import { ShopComponent } from './Component/shop/shop.component';
import { ProductdetailComponent } from './Component/productdetail/productdetail.component';
import { BlogSingComponent } from './Component/blog-sing/blog-sing.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    BlogComponent,
    CheckoutComponent,
    ContactUsComponent,
    IndexComponent,
    LoginComponent,
    ShopComponent,
    ProductdetailComponent,
    BlogSingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

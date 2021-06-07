import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/share/header/header.component';
import { FooterComponent } from './component/share/footer/footer.component';
import { LeftSidebarComponent } from './component/share/left-sidebar/left-sidebar.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { HomeComponent } from './component/home/home.component';
import { ShopComponent } from './component/shop/shop.component';
import { LoginComponent } from './component/login/login.component';
import { BlogListComponent } from './component/blog-list/blog-list.component';
import { BlogSingleComponent } from './component/blog-single/blog-single.component';
import { ContactComponent } from './component/contact/contact.component';
import { Page404Component } from './component/page404/page404.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ShopListProductComponent } from './component/shop-list-product/shop-list-product.component';
import { AccountComponent } from './component/account/account.component';
import { Ng5SliderModule } from 'ng5-slider';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftSidebarComponent,
    ProductDetailsComponent,
    HomeComponent,
    ShopComponent,
    LoginComponent,
    BlogListComponent,
    BlogSingleComponent,
    ContactComponent,
    Page404Component,
    CartComponent,
    CheckoutComponent,
    ShopListProductComponent,
    AccountComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDfni1WuIp9vDdQ-FtQoPF-OQ4LfRggcYY",
      libraries: ["places", "geometry"]
  }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'shop/:stringSearch', component: ShopComponent },
      { path: 'login', component: LoginComponent },
      { path: 'blog/blog-list', component: BlogListComponent },
      { path: 'blog/blog-single', component: BlogSingleComponent },
      { path: 'contact-us', component: ContactComponent },
      { path: 'page-404', component: Page404Component },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'account', component: AccountComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page404/page404.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

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
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'login', component: LoginComponent },
      { path: 'blog/blog-list', component: BlogListComponent },
      { path: 'blog/blog-single', component: BlogSingleComponent },
      { path: 'contact-us', component: ContactComponent },
      { path: 'page-404', component: Page404Component },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { ProductListCommentComponent } from './component/product-list-comment/product-list-comment.component';
import { AccountComponent } from './component/account/account.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { CustomClothesComponent } from './component/custom-clothes/custom-clothes.component';
import { CourseDialogComponent } from './component/course-dialog/course-dialog.component';
import { CustomComponent } from './component/custom/custom.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxChartsModule }from '@swimlane/ngx-charts';





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
    ProductListCommentComponent,
    CheckoutComponent,
    ShopListProductComponent,
    AccountComponent,
    UserProfileComponent,
    CustomClothesComponent,
    CourseDialogComponent,
    CustomComponent,
  ],
  imports: [
    MatExpansionModule,
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
   
    NgxChartsModule,
  
    HttpClientModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDfni1WuIp9vDdQ-FtQoPF-OQ4LfRggcYY",
      libraries: ["places", "geometry"]
    }),
    RouterModule.forRoot([
      { path: 'products', component: ProductDetailsComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'login', component: LoginComponent },
      { path: 'blog/blog-list', component: BlogListComponent },
      { path: 'blog/blog-single', component: BlogSingleComponent },
      { path: 'contact-us', component: ContactComponent },
      { path: 'page-404', component: Page404Component },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'account', component: AccountComponent },
      { path: 'user', component: UserProfileComponent },
      { path: 'custom-clothes', component: CustomClothesComponent },
      { path: 'testDialog', component: CourseDialogComponent },
      { path: 'custom', component: CustomComponent },
      { path: '', component: HomeComponent }
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

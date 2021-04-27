import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import {ProductService} from './services/productService';
import { SingleProductComponent } from './single-product/single-product.component'
import {HttpClientModule} from '@angular/common/http';
import { OrderComponent } from './order/order.component'


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    SingleProductComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import {ProductService} from './services/productService';
import { SingleProductComponent } from './single-product/single-product.component'
import {HttpClientModule} from '@angular/common/http';
import { OrderComponent } from './order/order.component';
import { SingleOrderComponent } from './single-order/single-order.component';
import { ProductAddComponent } from './product-add/product-add.component'


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    SingleProductComponent,
    OrderComponent,
    SingleOrderComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

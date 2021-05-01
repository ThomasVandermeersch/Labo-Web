import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { SingleProductComponent } from './single-product/single-product.component'
import {HttpClientModule} from '@angular/common/http';
import { OrderComponent } from './order/order.component';
import { SingleOrderComponent } from './single-order/single-order.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { OrderAddComponent } from './order-add/order-add.component'


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    SingleProductComponent,
    OrderComponent,
    SingleOrderComponent,
    ProductAddComponent,
    OrderAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

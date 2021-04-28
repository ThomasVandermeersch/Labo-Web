import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable, queueScheduler, throwError} from 'rxjs';

import {ProductService} from './productService'

const endpoint = 'http://localhost:8000/api/'

export interface Orders {
  idOrder:string;
  totalPriceOrder:number;
  custommerNameOrder:string;
}

export interface Order {
  id:string;
  totalPrice:number;
  customerName:string;
  email:string;
  orderProducts:Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private productService:ProductService) { }

    getOrders(): Observable<Orders[]>{
      return this.http.get<Orders[]>(endpoint + 'order');
    }

    getOrder(id): Observable<Order>{
      return this.http.get<Order>(endpoint + 'order/' + id);
    }

    makeOrder(orderObject): Observable<any>{
      console.log("---- CART ----")
      console.log(this.productService.cart)
      console.log("--- ORDER OBJECT ---- ")
      orderObject.cart = this.productService.cart;
      //orderObject.totalPrice = this.productService
      console.log(orderObject)
      return this.http.post(endpoint + 'order/new',orderObject)
    }  
}

// addProduct(product): Observable<any>{
//   console.log(product)
//   return this.http.post(endpoint + 'product/new',product)
// }
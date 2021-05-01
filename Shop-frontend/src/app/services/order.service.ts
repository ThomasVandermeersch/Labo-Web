import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import { CartService } from './cart.service';

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

  constructor(private http:HttpClient, private cartService:CartService) { }

    getOrders(): Observable<Orders[]>{
      return this.http.get<Orders[]>(endpoint + 'order');
    }

    getOrder(id): Observable<Order>{
      return this.http.get<Order>(endpoint + 'order/' + id);
    }

    makeOrder(orderObject): Observable<any>{

      orderObject.cart = this.cartService.cart;
      orderObject.totalPrice = this.cartService.getTotalPrice()
      console.log(orderObject)
      return this.http.post(endpoint + 'order/new',orderObject)
    }

    removeProduct(productId): Observable<any>{
      console.log(productId)
      return this.http.delete(endpoint + 'order/remove/'+productId)
    }
}
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

    getOrders(): Observable<Orders[]>{ // Get all orders -- call to the API 
      return this.http.get<Orders[]>(endpoint + 'order');
    }

    getOrder(id): Observable<Order>{ // Get specific order -- call to the API 
      return this.http.get<Order>(endpoint + 'order/' + id);
    }

    makeOrder(orderObject): Observable<any>{ // Make an order -- push to the API 
      orderObject.cart = this.cartService.cart;
      console.log(this.cartService.getTotalPrice())
      orderObject.totalPrice = this.cartService.getTotalPrice()
      return this.http.post(endpoint + 'order/new',orderObject)
    }

    removeOrder(orderId): Observable<any>{ // Remove specific order -- delete to the API 
      return this.http.delete(endpoint + 'order/remove/'+orderId)
    }
}
import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable, queueScheduler, throwError} from 'rxjs';

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

  constructor(private http:HttpClient) { }

    getOrders(): Observable<Orders[]>{
      return this.http.get<Orders[]>(endpoint + 'order');
    }

    getOrder(id): Observable<Order>{
      return this.http.get<Order>(endpoint + 'order/' + id);
    }
  
}

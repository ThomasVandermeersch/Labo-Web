import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators'
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { getLocaleExtraDayPeriods } from '@angular/common';

const endpoint = 'http://localhost:8000/api/'


export interface Order {
  idOrder:string;
  totalPriceOrder:number;
  custommerNameOrder:string;

}


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

    getOrders(): Observable<Order[]>{
      return this.http.get<Order[]>(endpoint + 'order');
    }
  
}

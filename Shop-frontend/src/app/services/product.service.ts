import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable, queueScheduler, throwError} from 'rxjs';

const endpoint = 'http://localhost:8000/api/'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  
  
  
  
  addProduct(product): Observable<any>{
    console.log(product)
    return this.http.post(endpoint + 'product/new',product)
  }
}

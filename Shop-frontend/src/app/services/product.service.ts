import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Observable, queueScheduler, throwError} from 'rxjs';

const endpoint = 'http://localhost:8000/api/'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  isLoaded = false;
  products = []
  constructor(private http:HttpClient) { }


  //Search products in the database
  getProductsFromServer() {
    return this.http
      .get<any[]>('http://localhost:8000/api/product')
  }

  getProduct(id){
    console.log(this.products)
    console.log(id)
    var product = null;
    this.products.forEach(elem =>{
      console.log(elem.id)
      if(elem.id == id) product = elem
    })
    console.log(product)
    return product
  }

  getProductName(id){
    return this.getProduct(id)['name'] 
  }

  getProductPrice(id){
    return this.getProduct(id)['price'] 

  }

  addProduct(product): Observable<any>{
    console.log(product)
    return this.http.post(endpoint + 'product/new',product)
  }
}

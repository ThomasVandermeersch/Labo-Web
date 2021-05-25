import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';

const endpoint = 'http://localhost:8000/api/'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  isLoaded = false; // this variable is used to load the products just once 
  products = []
  constructor(private http:HttpClient) { }


  //Search products in the database
  getProductsFromServer() {
    return this.http
      .get<any[]>(endpoint + 'product')
  }

  getProduct(id){ // returns the product
    var product = null;
    this.products.forEach(elem =>{
      if(elem.id == id) product = elem
    })
    return product
  }

  getProductName(id){
    return this.getProduct(id)['name'] 
  }

  getProductPrice(id){
    return this.getProduct(id)['price'] 

  }

  addProduct(product): Observable<any>{ // Save new product -- push to the API 
    return this.http.post(endpoint + 'product/new',product)
  }

  updateProduct(productId, product): Observable<any>{ // Modify product -- push to the API 
    return this.http.put(endpoint + 'product/modify/' + productId, product)
  }
}

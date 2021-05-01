import {HttpClient} from '@angular/common/http'
import { Injectable} from '@angular/core'


@Injectable()
export class ProductService {
  isLoaded = false;
  products = []
  constructor(private httpClient:HttpClient){}

  //Search products in the database
  getProductsFromServer() {
    return this.httpClient
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
}
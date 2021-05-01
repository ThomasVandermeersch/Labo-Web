import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';
import { Injectable} from '@angular/core'


@Injectable()
export class ProductService {
  isLoaded = false;
  products = []
  cart = {}
  productSubject = new Subject<any[]>();
  constructor(private httpClient:HttpClient){}

  //Search products in the database
  getProductsFromServer() {
    return this.httpClient
      .get<any[]>('http://localhost:8000/api/product')
      // .subscribe(
      //   (response) => {
      //     console.log('Response')
      //     this.products = response;
      //     this.emitProductSubject();
      //   },
      //   (error) => {
      //     console.log('Erreur ! : ' + error);
      //   }
      // );
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

  // emitProductSubject() {
  //       this.productSubject.next(this.products.slice());
  // }

}

// getOrders(): Observable<Orders[]>{
//   return this.http.get<Orders[]>(endpoint + 'order');
// }
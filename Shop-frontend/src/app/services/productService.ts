import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';
import { Injectable} from '@angular/core'


@Injectable()
export class ProductService {
  products = []
  productSubject = new Subject<any[]>();
  constructor(private httpClient:HttpClient){}

  //Search products in the database
  getProductsFromServer() {
    this.httpClient
      .get<any[]>('http://localhost:8000/api/product')
      .subscribe(
        (response) => {
          console.log('Response')
          this.products = response;
          this.emitProductSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }

    emitProductSubject() {
        this.productSubject.next(this.products.slice());
      }
}
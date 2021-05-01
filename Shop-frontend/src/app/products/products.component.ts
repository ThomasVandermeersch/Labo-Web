import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/productService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[];
  productSubscription : Subscription;

  constructor(private productService : ProductService) {}

  ngOnInit() {
    if(!this.productService.isLoaded){
      // this.productSubscription = this.productService.productSubject.subscribe(
      //   (products: any[]) => {
      //     this.products = products;
      //   }
      // );
      // this.productService.emitProductSubject();
      this.productService.getProductsFromServer().subscribe((resp=>{
        console.log(resp)
        this.products = resp
        this.productService.products = resp
      }));
      this.productService.isLoaded = true;
    }
    else{
      this.products = this.productService.products;
    }

  }
}

// this.service.getOrders().subscribe(
//   (resp) => {
//     console.log(resp);
//     this.orders = resp//[{"id": 123, "totalPrice":23},{"id": 123, "totalPrice":23},{"id": 123, "totalPrice":29},{"id": 123, "totalPrice":23}]
//   }
// )
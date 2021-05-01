import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { compareTwoStrings} from 'string-similarity';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[];

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

  filter(value){

    if(value==""){
      this.products = this.productService.products
    }
    else{
      value = value.toLowerCase()
      const filterList = []
      this.productService.products.forEach((product)=>{
        console.log(product.name)
        console.log(value)
        console.log(compareTwoStrings(product.name,value))
        if(  compareTwoStrings(product.name.toLowerCase(),value) >0.65){
          filterList.push(product)
        }
      })
      this.products = filterList
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { compareTwoStrings} from 'string-similarity';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[];
  errorMsg = null;

  constructor(private productService : ProductService) {}

  ngOnInit() {
    if(!this.productService.isLoaded){
      this.productService.getProductsFromServer().subscribe((resp)=>{
        this.products = resp
        this.productService.products = resp
        this.productService.isLoaded = true;
      },
      (err)=>{
        console.log(err)
        this.errorMsg = 'Error with the API - check console for more details'
      });
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

  clearFilter(){
    this.products = this.productService.products
  }
}
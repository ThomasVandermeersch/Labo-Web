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
  errorMsg = null; // display a message to the user when there is a problem with the API

  constructor(private productService : ProductService) {}

  ngOnInit() {
    if(!this.productService.isLoaded){ // this is used to load all products once. And not every time the page is request
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

  // Filter the products. 
  // To improve custommer experience, we will allow some spelling mistakes
  filter(value){
    if(value==""){
      this.products = this.productService.products //if no filter ==> return all products
    }
    else{
      value = value.toLowerCase()
      const filterList = []
      this.productService.products.forEach((product)=>{
        
        // compareTwoStrings is a function of the npm module : "string similarity"
        // the result of this function is the similarity between two strings expressed as 
        // a number between 0 and 1.
        // to have 'hEllO' and 'heLLo' considered as similar we will compare them in lowerCase 
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
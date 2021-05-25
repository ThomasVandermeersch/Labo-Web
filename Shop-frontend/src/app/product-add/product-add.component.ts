import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service'
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})

// Product add is used to Add and Modifiy a product 

export class ProductAddComponent implements OnInit { 
  product = {name:"",url:"",price:0, description:""}
  productId = null;
  statusModify = false;
  errorMsg = null; // display a message to the user when there is a problem with the API

  constructor(public service:ProductService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParams.modify){
      this.productId = this.route.snapshot.queryParams.modify
      this.product = this.service.getProduct(this.productId)
      this.statusModify = true; // set to true if product is modified !
    }
  }

  addProduct(){
    if(!this.statusModify){  // Adding a product to the database
      this.service.addProduct(this.product).subscribe(()=>{
        this.service.isLoaded = false; // because product change ==> reload products
        this.router.navigate(['/'])
     },
     (err)=>{
      console.log(err);
      if(err.error.detail) this.errorMsg = err.error.detail
      else this.errorMsg = 'An error occured -- check console for more details'
     })
    }
    else{  // Modifing a product of the database
      this.service.updateProduct(this.productId,this.product).subscribe(()=>{
        this.service.isLoaded = false; // because product change ==> reload products
        this.router.navigate(['/'])
      },
      (err)=>{
        console.log(err);
        if(err.error.detail) this.errorMsg = err.error.detail
        else this.errorMsg = 'An error occured -- check console for more details'
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service'
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})

export class ProductAddComponent implements OnInit {
  product = {name:"",url:"",price:0, description:""}
  productId = null;
  statusModify = false;
  errorMsg = null;

  constructor(public service:ProductService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParams.modify){
      this.productId = this.route.snapshot.queryParams.modify
      this.product = this.service.getProduct(this.productId)
      this.statusModify = true;
    }
  }

  addProduct(){
    if(!this.statusModify){
      this.service.addProduct(this.product).subscribe((result)=>{
        this.router.navigate(['/'])
     },
     (err)=>{
      console.log(err);
      if(err.error.detail) this.errorMsg = err.error.detail
      else this.errorMsg = 'An error occured -- check console for more details'
     })
    }
    else{
      this.service.updateProduct(this.productId,this.product).subscribe((result)=>{
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

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
  constructor(public service:ProductService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  addProduct(){
    this.service.addProduct(this.product).subscribe((result)=>{
      this.router.navigate(['/'])
    })
  }

}

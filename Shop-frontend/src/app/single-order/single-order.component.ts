import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service'
import { ActivatedRoute,Router } from "@angular/router";


@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {
  errorMsg = null;
  order = {id:'', totalPrice:0,customerName:'',email:''} ;
  orderProducts: any[];
  
  constructor(public service:OrderService,private route: ActivatedRoute,private router:Router) { }
  
  ngOnInit(): void {
    if(this.route.snapshot.queryParams.inspect){
      this.getOrder(this.route.snapshot.queryParams.inspect)
    }
  }

  getOrder(id){
    this.service.getOrder(id).subscribe(
      (resp) => {
        this.order = resp
        this.orderProducts = resp.orderProducts
      },
      (err)=>{
        console.log(err)
        this.errorMsg = 'Error with the API - check console for more details'
      }
    )
  }

  remove(id){
    this.service.removeProduct(id).subscribe((resp)=>{
      this.router.navigate(['/'])

    })
  }
}

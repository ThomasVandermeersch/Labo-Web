import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service'
import { ActivatedRoute,Router } from "@angular/router";


@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {
  
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
        console.log(resp);
        this.order = resp
        this.orderProducts = resp.orderProducts
        console.log(this.orderProducts)
      }
    )
  }

  remove(id){
    console.log("Remove : " + id)
    this.service.removeProduct(id).subscribe((resp)=>{
      console.log(resp)
      this.router.navigate(['/'])

    })
  }


}

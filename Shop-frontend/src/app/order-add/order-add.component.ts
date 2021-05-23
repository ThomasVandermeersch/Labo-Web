import { Component } from '@angular/core';
import {OrderService} from '../services/order.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent {
  order = {customerName:"",email:"",totalPrice:0, cart:{}}
  errorMsg = null;

  constructor(public service:OrderService, private router:Router) { }



  confirmOrder(){
    this.service.makeOrder(this.order).subscribe(
      (result)=>{
        this.router.navigate(['/'])
      },
      (err)=>{
        console.log(err);
        if(err.error.detail) this.errorMsg = err.error.detail
        else this.errorMsg = 'An error occured -- check console for more details'
      })
  }
}

import { Component } from '@angular/core';
import {OrderService} from '../services/order.service'
import { Router } from "@angular/router";
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent {
  order = {customerName:"",email:"",totalPrice:0, cart:{}}
  errorMsg = null; // display a message to the user when there is a problem with the API

  constructor(public service:OrderService, private router:Router,public  cart:CartService) { }



  confirmOrder(){
    this.service.makeOrder(this.order).subscribe(
      ()=>{
        this.router.navigate(['/'])
        this.cart.cart = {} // if order is made, empty the cart
      },
      (err)=>{
        console.log(err);
        if(err.error.detail) this.errorMsg = err.error.detail
        else this.errorMsg = 'An error occured -- check console for more details'
      })
  }
}

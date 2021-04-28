import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service'
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  order = {customerName:"",email:"",totalPrice:0, cart:{}}
  
  constructor(public service:OrderService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  confirmOrder(){
    this.service.makeOrder(this.order).subscribe((result)=>{
      console.log(result)
      this.router.navigate(['/'])
    })
  }

}

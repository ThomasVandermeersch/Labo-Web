import { Component, OnInit } from '@angular/core';
import {Order,OrderService} from '../services/order.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  constructor(public service:OrderService,) { }
  orders: any[];
  errorMsg = null;
  
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.service.getOrders().subscribe(
      (resp) => {
        this.orders = resp
      },
      (err)=>{
        console.log(err)
        this.errorMsg = 'Error with the API - check console for more details'
      }
    )
  }
}
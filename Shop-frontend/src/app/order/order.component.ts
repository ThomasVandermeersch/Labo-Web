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
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.service.getOrders().subscribe(
      (resp) => {
        console.log(resp);
        this.orders = resp//[{"id": 123, "totalPrice":23},{"id": 123, "totalPrice":23},{"id": 123, "totalPrice":29},{"id": 123, "totalPrice":23}]
      }
    )
  }
}

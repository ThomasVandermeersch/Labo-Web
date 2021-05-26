import { Component, OnInit } from '@angular/core';
import {Order,OrderService} from '../services/order.service'
import { compareTwoStrings} from 'string-similarity';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  constructor(public service:OrderService,) { }
  orders: any[];
  errorMsg = null; // display a message to the user when there is a problem with the API
  
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


    // Filter the orders. 
  // To improve custommer experience, we will allow some spelling mistakes
  filter(value){
    if(value==""){
      this.getOrders() //if no filter ==> return all products
    }
    else{
      value = value.toLowerCase()
      const filterList = []
      this.orders.forEach((order)=>{
        
        // compareTwoStrings is a function of the npm module : "string similarity"
        // the result of this function is the similarity between two strings expressed as 
        // a number between 0 and 1.
        // to have 'hEllO' and 'heLLo' considered as similar we will compare them in lowerCase 
        if(  compareTwoStrings(order.customerName.toLowerCase(),value) >0.65){ 
          filterList.push(order)
        }
      })
      this.orders = filterList
    }
  }

  clearFilter(){
    this.getOrders()  
  }
}
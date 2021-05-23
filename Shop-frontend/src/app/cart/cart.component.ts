import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {CartService} from '../services/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: object;
  
  constructor(private route: ActivatedRoute,private cartService:CartService ){}
    
  ngOnInit(){
    this.items = this.cartService.cart;
    if(this.route.snapshot.queryParams.add){
      this.increaseQuantity(this.route.snapshot.queryParams.add)
    }
  }

  increaseQuantity(id){
    this.cartService.increaseQuantity(id);
  }

  decreaseQuantity(id){
    this.cartService.decreaseQuantity(id)
  }

  removeItem(id){
    this.cartService.removeItem(id)
  }

  getName(id){
    return this.cartService.getName(id)
  }

  getPrice(id){
    return this.cartService.getPrice(id)
  }

  getTotalPrice(){
    return this.cartService.getTotalPrice()
  }
}
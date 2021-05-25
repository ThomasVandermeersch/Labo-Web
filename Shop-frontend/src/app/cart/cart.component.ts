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
    this.items = this.cartService.cart; // The cart is stored in the service
    
    if(this.route.snapshot.queryParams.add){
      this.increaseQuantity(this.route.snapshot.queryParams.add)
    }
  }

  increaseQuantity(id){
    this.cartService.increaseQuantity(id); // increase the product Qunatity in the cart
  }

  decreaseQuantity(id){
    this.cartService.decreaseQuantity(id)
  }

  removeItem(id){
    this.cartService.removeItem(id)
  }

  getName(id){
    return this.cartService.getName(id) //get the name of the product
  }

  getPrice(id){
    return this.cartService.getPrice(id) //get the price of the product
  }

  getTotalPrice(){
    return this.cartService.getTotalPrice() //get the price of the cart
  }
}
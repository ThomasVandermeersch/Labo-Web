import { Injectable } from '@angular/core';
import {ProductService} from './product.service'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = {13:0}

  constructor(private productService:ProductService) { }

  increaseQuantity(id){
    console.log(id)
    console.log("I'm called")
    if(this.cart[id]) this.cart[id] += 1 // Increase quantity if product in cart.
    else this.cart[id] = 1  // Add product in cart.
  }

  decreaseQuantity(id){
    this.cart[id] -= 1
    if(this.cart[id] ==0){
      this.removeItem(id)
    }
  }

  removeItem(id){
    delete this.cart[id]
  }

  getName(id){
    var p = this.productService.getProductName(parseInt(id,10))
    console.log(p)
    return p
  }

  getPrice(id){
    var p = this.productService.getProductPrice(parseInt(id,10))
    console.log(p)
    return p
  }

  getTotalPrice(){
    var totalPrice = 0
    for (const [key, quantity] of Object.entries(this.cart)) {
      totalPrice += (quantity * this.getPrice(key))
    }
    return totalPrice
  }
}

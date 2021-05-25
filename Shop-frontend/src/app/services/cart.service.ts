import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import {ProductService} from './product.service'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = {}

  constructor(private productService:ProductService) { }

  increaseQuantity(id){
    if(this.cart[id]) this.cart[id] += 1 // Increase quantity if product in cart.
    else this.cart[id] = 1  // Add product in cart.
  }

  decreaseQuantity(id){
    this.cart[id] -= 1
    if(this.cart[id] ==0){ //if cart is empty, remove product from the cart
      this.removeItem(id)
    }
  }

  removeItem(id){
    delete this.cart[id] // remove item from the cart
  }

  getName(id){ //get product inf
    var p = this.productService.getProductName(parseInt(id,10))
    return p
  }

  getPrice(id){
    var p = this.productService.getProductPrice(parseInt(id,10))
    return p
  }

  getTotalPrice(){ // Get the total price of the cart
    var totalPrice = 0
    for (const [key, quantity] of Object.entries(this.cart)) {
      totalPrice += (this.getPrice(key) * Number(quantity))
    }
    return totalPrice
  }
}

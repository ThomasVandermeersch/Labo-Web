import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/productService';
import { ActivatedRoute } from "@angular/router";
import {CartService} from '../services/cart.service'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: object;
  constructor(private route: ActivatedRoute,private cartService:CartService ){

  }
    ngOnInit(){
      this.items = this.cartService.cart;
      if(this.route.snapshot.queryParams.add){
        this.increaseQuantity(this.route.snapshot.queryParams.add)
      }
    }

    increaseQuantity(id){
      this.cartService.increaseQuantity(id);
      // if(this.items[id]) this.items[id] += 1
      // else this.items[id] = 1
    }

    decreaseQuantity(id){
      this.cartService.decreaseQuantity(id)
      // this.items[id] -= 1
      // if(this.items[id] ==0){
      //   this.removeItem(id)
      //}
    }

    removeItem(id){
      this.cartService.removeItem(id)
    }

    getName(id){
      return this.cartService.getName(id)
      // var p = this.productService.getProductName(parseInt(id,10))
      // console.log(p)
      // return p
    }

    getPrice(id){
      return this.cartService.getPrice(id)
      // var p = this.productService.getProductPrice(parseInt(id,10))
      // console.log(p)
      // return p
    }

    getTotalPrice(){
      return this.cartService.getTotalPrice()
      // var totalPrice = 0
      // for (const [key, value] of Object.entries(this.items)) {
      //   totalPrice += (value * this.getPrice(key))
      // }
      // return totalPrice
    }
}

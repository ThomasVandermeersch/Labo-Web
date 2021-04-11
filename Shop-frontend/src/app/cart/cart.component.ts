import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/productService';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: object;
  constructor(private productService : ProductService,private route: ActivatedRoute){

  }
    ngOnInit(){
      this.items = this.productService.cart;

      if(this.route.snapshot.queryParams.add){
        this.increaseQuantity(this.route.snapshot.queryParams.add)
      }

  
      // if(this.route.snapshot.queryParams.add){
      //   if(this.items[this.route.snapshot.queryParams.add]) this.items[this.route.snapshot.queryParams.add] += 1
      //   else this.items[this.route.snapshot.queryParams.add] = 1
      // }



    }

    increaseQuantity(id){
      if(this.items[id]) this.items[id] += 1
      else this.items[id] = 1
    }

    decreaseQuantity(id){
      this.items[id] -= 1
      if(this.items[id] ==0){
        this.removeItem(id)
      }
    }

    removeItem(id){
      delete this.items[id]
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
      for (const [key, value] of Object.entries(this.items)) {
        totalPrice += (value * this.getPrice(key))
      }
      return totalPrice
    }
}

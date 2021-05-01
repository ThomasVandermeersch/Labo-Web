import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  
  @Input() productName: string;
  @Input() productPrice: number;
  @Input() productUrl: string;
  @Input() productId: string;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
  }

  remove(id){
    console.log("Remove : " + id)
    this.service.removeProduct(id).subscribe((resp)=>{
      console.log(resp)
    })
  }

}

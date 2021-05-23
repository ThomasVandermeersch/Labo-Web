import { Component, Input} from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent{
  
  @Input() productName: string;
  @Input() productPrice: number;
  @Input() productUrl: string;
  @Input() productId: string;
  @Input() productDescription: string;


  constructor(private service: ProductService) { }

  modify(id){
    console.log("Modify : " + id)
  }
}

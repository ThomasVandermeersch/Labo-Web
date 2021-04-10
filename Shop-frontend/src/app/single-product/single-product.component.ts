import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() productName: string;
  @Input() productPrice: number;
  @Input() productUrl: string;



  constructor() { }

  ngOnInit(): void {
  }

}

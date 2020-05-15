import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product

  constructor(
    private cart:CartService
  ) { }

  quantity: number 

  ngOnInit() {
  }

  onCartAddition(){
    this.cart.selectedProducts$.next({
      ...this.cart.selectedProducts$.getValue(),
      [this.product.id]:{
        ...this.product,
        quantity: this.quantity
      } 
     })
  }

  onPlusSign(){
    this.quantity ? this.quantity++ : this.quantity = 1 
  }
  onMinusSign(){
    this.quantity && this.quantity > 0 ? this.quantity-- :  this.quantity = 0 
  }
}

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

  numberOfProducts: number

  ngOnInit() {
  }

  onCartAddition(){
    if (this.numberOfProducts){
      this.cart.selectedProducts$.next([...this.cart.selectedProducts$.getValue(), {...this.product, number:this.numberOfProducts}])
    }
    else{
      this.numberOfProducts = 1
      this.onCartAddition()
    }
  }

}

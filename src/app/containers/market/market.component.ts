import { Component, OnInit } from "@angular/core";
import { CartService } from 'src/app/cart.service';

@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
})
export class MarketComponent implements OnInit {
  products=this.cart.products
  constructor(private cart:CartService) {}

  ngOnInit() {}

  onDone(){
    this.cart.doneDialog()
  }
}

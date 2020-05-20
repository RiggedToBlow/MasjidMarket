import { Component, OnInit, Input } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  @Input() product;

  constructor(private cart: CartService, private snack: MatSnackBar) {}

  quantity: number;

  ngOnInit() {}

  onCartAddition() {
    if (this.quantity) {
      this.cart.selectedProducts$.next({
        ...this.cart.selectedProducts$.getValue(),
        [this.product.id]: {
          ...this.product,
          quantity: this.quantity,
        },
      });
      this.snack.open("تمت الإضافة للسلة بنجاح 👍")
    }
  }

  onPlusSign() {
    this.quantity ? this.quantity++ : (this.quantity = 1);
  }
  onMinusSign() {
    this.quantity && this.quantity > 0 ? this.quantity-- : (this.quantity = 0);
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { MatDialog } from "@angular/material/dialog";
import { CartBillDialogComponent } from "src/app/components/cart-bill-dialog/cart-bill-dialog.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
})
export class MarketComponent implements OnInit, OnDestroy {
  products$ = this.cart.products$;
  selectedProducts$ = this.cart.selectedProducts$;
  subscription$ = new Subscription();

  constructor(private cart: CartService, private dialog: MatDialog) {}

  ngOnInit() {
    this.cart.getProducts();
    this.subscription$.add(
      this.selectedProducts$.subscribe((ob: any) => {
        const arr = Object.values(ob);
        if (arr.length) {
          const total = arr.reduce(((acc:number,next:any)=>acc + (+next.price * +next.quantity)),0)
          this.cart.totalPrice$.next(total)
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onDone() {
    this.dialog.open(CartBillDialogComponent);
    /* this.cart.doneDialog() */
  }
}

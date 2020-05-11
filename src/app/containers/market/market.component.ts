import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CartBillDialogComponent } from 'src/app/components/cart-bill-dialog/cart-bill-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
})
export class MarketComponent implements OnInit, OnDestroy {
  products$=this.cart.products$
  selectedProducts$=this.cart.selectedProducts$
  subscription$ = new Subscription()

  constructor(
    private cart:CartService,
    private dialog:MatDialog
    ) {}


  ngOnInit() {
    this.subscription$.add(
      this.selectedProducts$.subscribe(arr=>{
        if (arr.length){
          const last = arr[arr.length-1]
          /* +last.number implicit conversion from string to number  */
          this.cart.totalPrice$.next(this.cart.totalPrice$.getValue() + ( +last.price* +last.number))
        }
      })
    )
  }

  ngOnDestroy(){
    this.subscription$.unsubscribe()
  }

  onDone(){
    this.dialog.open(CartBillDialogComponent)
    /* this.cart.doneDialog() */
  }
}

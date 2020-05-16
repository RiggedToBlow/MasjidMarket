import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CartService } from "src/app/services/cart.service";
import { map, take } from "rxjs/operators";
import { ProductCardComponent } from "../product-card/product-card.component";
import { combineLatest } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-cart-bill-dialog",
  templateUrl: "./cart-bill-dialog.component.html",
  styleUrls: ["./cart-bill-dialog.component.scss"],
})
export class CartBillDialogComponent implements OnInit {
  userPoints$ = this.cart.userPoints$;
  totalPrice$ = this.cart.totalPrice$;

  dataSource$ = this.cart.selectedProducts$.pipe(
    map((ob) => {
      const arr = Object.values(ob);
      return arr.map((val: any) => ({
        ...val,
        total: +val.price * +val.quantity,
      }));
    })
  );
  constructor(
    public dialogRef: MatDialogRef<CartBillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private cart: CartService,
    private snack: MatSnackBar
  ) {}

  displayedColumns: string[] = [
    "title",
    "quantity",
    "price",
    "total",
    "button",
  ];
  /* dataSource =[
    {title:'بسكليتة حمرة', quantity:'1', price:'30', total:'30'},
    {title:'دفتر سلك', quantity:'5', price:'10', total:'50'},
    {title:'دفتر سلك', quantity:'5', price:'10', total:'50'},
  ]
 */
  ngOnInit() {}

  getTotal(dataSource) {
    return dataSource.reduce((acc, curr: any) => acc + +curr.total, 0);
  }

  onPlusSign(element) {
    this.cart.selectedProducts$.next({
      ...this.cart.selectedProducts$.getValue(),
      [element.id]: { ...element, quantity: element.quantity + 1 },
    });
  }
  onMinusSign(element) {
    this.cart.selectedProducts$.next({
      ...this.cart.selectedProducts$.getValue(),
      [element.id]: {
        ...element,
        quantity: element.quantity ? element.quantity - 1 : 0,
      },
    });
  }

  onBuy() {
    combineLatest(this.userPoints$, this.totalPrice$)
      .pipe(take(1))
      .subscribe(([points, price]) => {
        if (price <= points) {
          this.cart.buyProducts();
          this.dialogRef.close();
        } else this.snack.open("نقاطك أقل من اللازم");
      });
  }
  onCancel() {
    this.dialogRef.close();
  }
}

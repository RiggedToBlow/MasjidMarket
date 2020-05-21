import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { combineLatest } from "rxjs";
import { map, take } from "rxjs/operators";
import { CartService } from "src/app/services/cart.service";

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
      let dataSource =  new MatTableDataSource(
        arr.filter((val:any)=>val.quantity).map((val: any) => ({
          ...val,
          total: +val.price * +val.quantity,
        }))
      );
      return dataSource
    }),
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

  ngOnInit() {}

  getTotal(dataSource) {
    return dataSource.data.reduce((acc, curr: any) => acc + +curr.total, 0);
  }

  onPlusSign(element) {
    this.cart.selectedProducts$.next({
      ...this.cart.selectedProducts$.getValue(),
      [element.id]: { ...element, quantity: element.quantity + 1 },
    });
  }
  onMinusSign(element) {
    let currentVal = this.cart.selectedProducts$.getValue();
    this.cart.selectedProducts$.next({
      ...currentVal,
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

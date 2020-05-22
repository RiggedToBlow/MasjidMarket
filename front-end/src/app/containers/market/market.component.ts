import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { MatDialog } from "@angular/material/dialog";
import { CartBillDialogComponent } from "src/app/components/cart-bill-dialog/cart-bill-dialog.component";
import { Subscription, BehaviorSubject, combineLatest } from "rxjs";
import { map, take, tap } from "rxjs/operators";

@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
})
export class MarketComponent implements OnInit, OnDestroy {
  selectedProducts$ = this.cart.selectedProducts$;
  subscription$ = new Subscription();
  currentPage$ = new BehaviorSubject(1);
  products$ = this.cart.products$;
  shownProducts$ = combineLatest(this.products$, this.currentPage$).pipe(
    map(([products, page]) => products.slice(10 * page - 10, 10 * page)),
  );
  constructor(private cart: CartService, private dialog: MatDialog) {}

  ngOnInit() {
    this.cart.getProducts();
    this.subscription$.add(
      this.selectedProducts$.subscribe((ob: any) => {
        const arr = Object.values(ob);
        if (arr.length) {
          const total = arr.reduce(
            (acc: number, next: any) => acc + +next.price * +next.quantity,
            0
          );
          this.cart.totalPrice$.next(total);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onForward() {
    combineLatest(this.products$, this.currentPage$)
      .pipe(take(1))
      .subscribe(([products, page]) => {
        const length = products.length / 10.0;
        if (page < length) {
          this.currentPage$.next(page + 1);
          document.body.scrollTop = 0;
        }
      });
  }
  onBackward() {
    this.currentPage$.pipe(take(1)).subscribe((page) => {
      if (page > 1) {
        this.currentPage$.next(page - 1);
        document.body.scrollTop = 0;
      }
    });
  }

  onLastPage() {
    this.products$.pipe(take(1)).subscribe((products) => {
      const length = products.length / 10.0;
      this.currentPage$.next(Math.ceil(length));
    });
  }
  onFirstPage() {
    this.currentPage$.next(1);
  }
}

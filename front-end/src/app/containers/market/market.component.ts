import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, combineLatest, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
})
export class MarketComponent implements OnInit, OnDestroy {
  selectedProducts$ = this.cart.selectedProducts$;
  subscription$ = new Subscription();
  products$ = this.cart.products$;
  currentPage$ = new BehaviorSubject(1);
  PagesArray$ = this.products$.pipe(
    map((products) => {
      const pagesLength = Math.ceil(products.length / 9.0);
      return new Array(pagesLength).fill(0).map((val, index) => index + 1);
    })
  );
  shownProducts$ = combineLatest(this.products$, this.currentPage$).pipe(
    map(([products, page]) => products.slice(9 * page - 9, 9 * page))
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
          this.scrollToTop()
        }
      });
  }
  onBackward() {
    this.currentPage$.pipe(take(1)).subscribe((page) => {
      if (page > 1) {
        this.currentPage$.next(page - 1);
        this.scrollToTop()
      }
    });
  }

  onLastPage() {
    this.products$.pipe(take(1)).subscribe((products) => {
      const length = products.length / 10.0;
      this.currentPage$.next(Math.ceil(length));
      this.scrollToTop()
    });
  }
  onFirstPage() {
    this.currentPage$.next(1);
    this.scrollToTop()
  }

  changePage(page) {
    this.currentPage$.next(page);
    this.scrollToTop()
  }

  scrollToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}

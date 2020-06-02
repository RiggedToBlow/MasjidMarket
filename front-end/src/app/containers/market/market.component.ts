import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, combineLatest, Subscription } from "rxjs";
import { map, take, pluck, tap } from "rxjs/operators";
import { CartService } from "src/app/services/cart.service";
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
})
export class MarketComponent implements OnInit, OnDestroy {
  selectedProducts$ = this.cart.selectedProducts$;
  subscription$ = new Subscription();
  products$ = this.cart.products$;
  categorized$ = this.cart.categorizedProducts$
  categories$ = this.categorized$.pipe(map(val=>Object.keys(val)))
  selectedCategory = new FormControl("All")
  currentPage$ = new BehaviorSubject(1);
  PagesArray$ = this.products$.pipe(
    map((products) => {
      const pagesLength = Math.ceil(products.length / 9.0);
      return new Array(pagesLength).fill(0).map((val, index) => index + 1);
    })
  );
  shownProducts$ = this.getShownProducts(this.products$)

  constructor(private cart: CartService, private dialog: MatDialog) {}

    getShownProducts(products){
      return combineLatest(products, this.currentPage$).pipe(
        map(([products, page]:any) => products.slice(9 * page - 9, 9 * page)),
      );
    }

  ngOnInit() {
    this.cart.getProducts();
    this.subscription$.add(
      this.selectedCategory.valueChanges
      .subscribe(category=>{
        if (category =="All")
          this.shownProducts$ = this.getShownProducts(this.products$)
        else
          this.shownProducts$ = this.getShownProducts(this.categorized$.pipe(pluck(category)))
      })
    )
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
        const length = products.length / 9.0;
        if (page <= length) {
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
      const length = products.length / 9.0;
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
  // this is edit
  scrollToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}

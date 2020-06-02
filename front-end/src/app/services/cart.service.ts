import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, of, combineLatest } from "rxjs";
import { switchMap, take, map, catchError, tap } from "rxjs/operators";
import { LoginService } from "./login.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class CartService {
  baseURL = this.loginService.baseURL;
  totalPrice$ = new BehaviorSubject<any>(0);
  userPoints$ = new BehaviorSubject(0);

  products$ = new BehaviorSubject([]);
  categorizedProducts$ = new BehaviorSubject({})

  selectedProducts$ = new BehaviorSubject({});
  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.products$.subscribe(products=>{
      const categorized = products.reduce((acc,next)=>{
        let category = acc[next.category]  ?acc[next.category]: []
        category.push(next)
        return {...acc, [next.category]:category}
      },{})
      this.categorizedProducts$.next(categorized)
    })
  }

  getProducts() {
    this.loginService.loggedInToken
      .pipe(
        take(1),
        switchMap((token) => {
          return this._getProducts(token);
        }),
      )
      .subscribe((products: any) => this.products$.next(products));
  }

  _getProducts(token) {
    return this.http.post(`${this.baseURL}product`, { token });
  }

  buyProducts() {
    combineLatest(this.selectedProducts$, this.loginService.loggedInToken)
      .pipe(
        map(([ob, token]) => ({
          items: Object.values(ob)
            .map((val: any) => ({
              id: +val.id,
              quantity: +val.quantity,
            }))
            .filter((val) => val.quantity),
          token,
        })),
        switchMap((arr: any) =>
          this._buyProducts(arr).pipe(
            catchError((error) => of(" لقد حصل خطأ ما اثناء الشراء "))
          )
        ),
        take(1)
      )
      .subscribe((val) => {
        if (typeof val == "object") {
          this.snackBar.open("تم الشراء بنجاح");
          this.userPoints$.next(
            +this.userPoints$.getValue() - +this.totalPrice$.getValue()
          );
          this.totalPrice$.next(0)
          this.selectedProducts$.next([])
        } else this.snackBar.open(val);
      });
  }

  _buyProducts(ob: { items: []; token: string }) {
    return this.http.post(`${this.baseURL}buy`, ob);
  }
}

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
  totalPrice$ = new BehaviorSubject<any>(0);
  baseURL = this.loginService.baseURL;
  userPoints$ = new BehaviorSubject(localStorage.getItem("points") || 0);

  products$ = new BehaviorSubject([]);

  selectedProducts$ = new BehaviorSubject({});
  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  getProducts() {
    this.loginService.loggedInToken
      .pipe(
        take(1),
        switchMap((token) => {
          return this._getProducts(token);
        })
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
          items: Object.values(ob).map((val: any) => ({
            id: +val.id,
            quantity: +val.quantity,
          })),
          token,
        })),
        tap(console.log),
        switchMap((arr) =>
          this._buyProducts(arr).pipe(
            catchError((error) =>
              of(this.snackBar.open(" لقد حصل خطأ ما اثناء الشراء "))
            )
          )
        ),
        take(1)
      )
      .subscribe((val) => {
        this.snackBar.open("تم الشراء بنجاح")
        this.userPoints$.next(+this.userPoints$.getValue() - +this.totalPrice$.getValue())
      });
  }

  _buyProducts(ob: { items: []; token: string }) {
    return this.http.post(`${this.baseURL}buy`, ob);
  }
}

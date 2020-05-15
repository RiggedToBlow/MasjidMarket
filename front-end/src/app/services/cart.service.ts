import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { switchMap, take, map, catchError } from "rxjs/operators";
import { LoginService } from "./login.service";
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: "root",
})
export class CartService {
  totalPrice$ = new BehaviorSubject<any>(0);
  baseURL = this.loginService.baseURL
  userPoints$ = new BehaviorSubject(0);
  
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
        return this._getProducts(token)}))
      .subscribe((products: any) => this.products$.next(products));
  }

  _getProducts(token) {
    return this.http.post(`${this.baseURL}product`, { token });
  }

  _buyProducts(){
    return this.selectedProducts$.pipe(
      map(ob=>Object.values(ob).map((val:any)=>({id:val.id, quantity:val.quantity}))),
      switchMap(arr=> this.buyProducts(arr).pipe(
        catchError(error=>of(this.snackBar.open(" لقد حصل خطأ ما اثناء الشراء ")))
      ))
    )
  }

  buyProducts(arr){
    return this.http.post(`${this.baseURL}buy`, arr)
  }

}

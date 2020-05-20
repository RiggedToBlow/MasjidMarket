import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartBillDialogComponent } from '../cart-bill-dialog/cart-bill-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  totalPrice$= this.cart.totalPrice$
  userPoints$ = this.cart.userPoints$
  loggedIn$ = this.login.loggedInToken
  constructor(
    private cart:CartService,
    private login: LoginService,
    private router: Router,
    private dialog:MatDialog
    ) { }

  ngOnInit() {
  }

  signOut(){
    this.login.loggedInToken.next(null)
    this.cart.totalPrice$.next(null)
    this.cart.userPoints$.next(null)
    localStorage.removeItem("token")
    localStorage.removeItem("points")
    this.router.navigate([''])
  }

  onBuy(){
    this.dialog.open(CartBillDialogComponent)
  }
}

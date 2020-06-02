import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { CartService } from "src/app/services/cart.service";
import { take, catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {

  form = this.fb.group({
    username:["",[Validators.required]],
    password:["",[Validators.required]]
  })

  constructor(
    private router: Router,
    private loginService: LoginService,
    private cartService: CartService,
    private fb:FormBuilder,
    private snack:MatSnackBar
  ) {}

  ngOnInit() {}

  onLogin() {
    if(this.form.valid){
      this.loginService
        .login(this.form.value).pipe(
          take(1),
          catchError(error=>of(this.snack.open("لقد حصل خطأ اثناء تسجيل الدخول")))
          )
        .subscribe((val: any) => {
          this.loginService.loggedInToken.next(val.token);
          this.cartService.userPoints$.next(val.points);
          this.router.navigate(['market'])
        });
    }
  }
}

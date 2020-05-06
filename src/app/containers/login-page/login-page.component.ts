import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  studentNumber = new FormControl("",Validators.minLength(4))

  constructor(
    private router:Router,
    private login: LoginService
  ) { }

  ngOnInit() {
  }

  onLogin(){
    if (this.studentNumber.value == "1234")
      this.router.navigate(["market"])
    else
      this.login.wrongNumberMessage()
  }

}

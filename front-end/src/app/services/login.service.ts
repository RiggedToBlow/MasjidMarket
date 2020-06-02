import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
/* TODO Replace with ./ for production in heroku */
/* TODO Replace with  http://127.0.0.1:8000/ for development*/
/* TODO Replace with https://alkenjlah-market.herokuapp.com/  for production on 000webhost */
  baseURL =  "./"


  loggedInToken = new BehaviorSubject("")

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  canActivate(route, state){
    return this.loggedInToken.pipe(
      map(val=>{
        if (val) {
          return true
        }
        return this.router.parseUrl('')
      }),
    )
  }

  login(user){
    return this.http.post(`${this.baseURL}login`,{...user})
  }

}

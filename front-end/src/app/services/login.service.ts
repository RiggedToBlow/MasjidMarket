import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
/* TODO Replace with ./ for production */
/* Replace with  http://127.0.0.1:8000/ for development*/
  baseURL =  "http://127.0.0.1:8000/"


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

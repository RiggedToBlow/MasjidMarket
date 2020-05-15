import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  baseURL = "http://127.0.0.1:8000/"

  loggedInToken = new BehaviorSubject(localStorage.getItem("token") || 0)
ks
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
        return false
      }),
    )
  }

  login(user){
    return this.http.post(`${this.baseURL}login`,{...user})
  }

}

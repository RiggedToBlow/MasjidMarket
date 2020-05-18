import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'سوق مسجد الكنجلية الالكتروني';

  constructor(
    private login:LoginService,
    private router:Router
  ){}

  ngOnInit(){
    this.login.loggedInToken.subscribe(res=>{
      if (res)
        this.router.navigate(['market'])
    })
  }

}

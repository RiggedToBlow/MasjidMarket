import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { MarketComponent } from './containers/market/market.component';
import { LoginService } from './services/login.service';


const routes: Routes = [
  {
    path:"",
    component:LoginPageComponent
  },
  {
    path:"market",
    component:MarketComponent,
    canActivate:[LoginService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

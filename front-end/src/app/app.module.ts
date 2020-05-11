import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { MarketComponent } from './containers/market/market.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



/* Material Modules Imports */

import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatDialogModule} from '@angular/material/dialog'
import {MatTableModule} from '@angular/material/table'


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartBillDialogComponent } from './components/cart-bill-dialog/cart-bill-dialog.component';

const MaterialModules=[
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatTableModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MarketComponent,
    NavBarComponent,
    ProductCardComponent,
    CartBillDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...MaterialModules,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents:[CartBillDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

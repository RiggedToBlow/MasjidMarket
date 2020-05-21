import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/* Material Modules Imports */
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CartBillDialogComponent } from "./components/cart-bill-dialog/cart-bill-dialog.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { LoginPageComponent } from "./containers/login-page/login-page.component";
import { MarketComponent } from "./containers/market/market.component";



const MaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatTableModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MarketComponent,
    NavBarComponent,
    ProductCardComponent,
    CartBillDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...MaterialModules,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgProgressModule,
    NgProgressHttpModule,
  ],
  entryComponents: [CartBillDialogComponent],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

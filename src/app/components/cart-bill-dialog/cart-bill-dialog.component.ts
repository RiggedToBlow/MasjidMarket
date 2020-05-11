import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { map } from 'rxjs/operators';
import { ProductCardComponent } from '../product-card/product-card.component';



@Component({
  selector: 'app-cart-bill-dialog',
  templateUrl: './cart-bill-dialog.component.html',
  styleUrls: ['./cart-bill-dialog.component.scss']
})
export class CartBillDialogComponent implements OnInit {

  dataSource$ = this.cart.selectedProducts$.pipe(
    map(arr=>arr.map(product=> ({...product, total: +product.price * +product.number})))
  )
  constructor(
    public dialogRef:MatDialogRef<CartBillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private cart:CartService
  ) { }

  displayedColumns: string[] = [ 'name', 'number', 'price', 'total', 'button'];
  dataSource =[
    {name:'بسكليتة حمرة', number:'1', price:'30', total:'30'},
    {name:'دفتر سلك', number:'5', price:'10', total:'50'},
    {name:'دفتر سلك', number:'5', price:'10', total:'50'},
  ]

  ngOnInit() {
  }

  getTotal(){
    return this.dataSource.reduce((acc,curr:any)=>acc+(+curr.total), 0)
  }
}

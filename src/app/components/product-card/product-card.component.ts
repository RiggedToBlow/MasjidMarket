import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product = {
    title:"بسكليتة ظريفة كتير",
    image:"https://image.made-in-china.com/2f0j00kpIGTRefIHcB/Compertitive-Price-Bicycle-Kids-Bike-Popular-Style.jpg",
    price:500,
    description:"بسكليتة يابانية اصلية بتمشي وبتركد واحيانا بتطلع عالسقف",
  }

  constructor() { }

  ngOnInit() {
  }

}

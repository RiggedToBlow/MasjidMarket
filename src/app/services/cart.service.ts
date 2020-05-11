import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { from, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalPrice$ = new BehaviorSubject<number>(0)

  products$ = new BehaviorSubject([
    {
      title: "بسكليتة ظريفة كتير",
      image:
        "https://image.made-in-china.com/2f0j00kpIGTRefIHcB/Compertitive-Price-Bicycle-Kids-Bike-Popular-Style.jpg",
      price: 500,
      description: "بسكليتة يابانية اصلية بتمشي وبتركد واحيانا بتطلع عالسقف",
    },
    {
      title: "بسكليتة ظريفة كتير",
      image:
        "https://image.made-in-china.com/2f0j00kpIGTRefIHcB/Compertitive-Price-Bicycle-Kids-Bike-Popular-Style.jpg",
      price: 500,
      description: "بسكليتة يابانية اصلية بتمشي وبتركد واحيانا بتطلع عالسقف",
    },
    {
      title: "بسكليتة ظريفة كتير",
      image:
        "https://image.made-in-china.com/2f0j00kpIGTRefIHcB/Compertitive-Price-Bicycle-Kids-Bike-Popular-Style.jpg",
      price: 500,
      description: "بسكليتة يابانية اصلية بتمشي وبتركد واحيانا بتطلع عالسقف",
    },
    {
      title: "بسكليتة ظريفة كتير",
      image:
        "https://image.made-in-china.com/2f0j00kpIGTRefIHcB/Compertitive-Price-Bicycle-Kids-Bike-Popular-Style.jpg",
      price: 500,
      description: "بسكليتة يابانية اصلية بتمشي وبتركد واحيانا بتطلع عالسقف",
    },
    {
      title: "بسكليتة ظريفة كتير",
      image:
        "https://image.made-in-china.com/2f0j00kpIGTRefIHcB/Compertitive-Price-Bicycle-Kids-Bike-Popular-Style.jpg",
      price: 500,
      description: "بسكليتة يابانية اصلية بتمشي وبتركد واحيانا بتطلع عالسقف",
    },
    {
      title: "بسكليتة ظريفة كتير",
      image:
        "https://image.made-in-china.com/2f0j00kpIGTRefIHcB/Compertitive-Price-Bicycle-Kids-Bike-Popular-Style.jpg",
      price: 500,
      description: "بسكليتة يابانية اصلية بتمشي وبتركد واحيانا بتطلع عالسقف",
    },
    {
      title: "بسكليتة ظريفة كتير",
      image:
        "https://image.made-in-china.com/2f0j00kpIGTRefIHcB/Compertitive-Price-Bicycle-Kids-Bike-Popular-Style.jpg",
      price: 500,
      description: "بسكليتة يابانية اصلية بتمشي وبتركد واحيانا بتطلع عالسقف",
    },
    {
      title: "بسكليتة ظريفة كتير",
      image:
        "https://image.made-in-china.com/2f0j00kpIGTRefIHcB/Compertitive-Price-Bicycle-Kids-Bike-Popular-Style.jpg",
      price: 500,
      description: "بسكليتة يابانية اصلية بتمشي وبتركد واحيانا بتطلع عالسقف",
    },
  ])

  selectedProducts$ = new BehaviorSubject([])

  constructor() {  }

}

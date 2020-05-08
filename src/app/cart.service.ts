import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { from, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalPrice = new BehaviorSubject<number>(0)

  constructor() { }
  products = [
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
  ];

  doneDialog(){
    return from(
      Swal.fire({
        title: 'هل أنت متأكد',
        text:"لقد قمت بشراء (3 بسكليتة, 2 اقلام, 4 شغلات)",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم انا متأكد',
        cancelButtonText: 'لا'
      })
    ).pipe(
      map(response=>response.value? true:false)
    )
  }
}

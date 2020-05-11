import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  wrongNumberMessage(){
    Swal.fire({
      toast:true,
      icon:'error',
      title:'الرقم خاطئ',
      confirmButtonText:"حسناً",
      position:"top-end"
    })
  }
}

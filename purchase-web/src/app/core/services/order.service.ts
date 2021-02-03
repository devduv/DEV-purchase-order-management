import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpCliente: HttpClient) { }

  public sendOrder(order: Order) {
    return this.httpCliente.post<any>(`${environment.API}/order`, order)
      .toPromise();
  }
}

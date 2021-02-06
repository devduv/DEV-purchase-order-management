import { Component, HostListener, Input, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/core/model/Order';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { OrderService } from 'src/app/core/services/order.service';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class OrderListComponent implements OnInit {

  @Input()
  public orders: any;

  public OrderStatus = OrderStatus;

  constructor(
    private personService: PersonService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    console.log("orders", this. orders);
  }

  @HostListener('window:focus')
  async onFocus() {
    this.getOrderList();
  }

  async getOrderList() {
    const person = this.personService.getPersonalInformation();
    this.orders = await this.orderService.getOrders(person.document);
  }
}

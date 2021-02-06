import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/core/model/Menu';
import { MenuService } from 'src/app/core/services/menu.service';
import { OrderService } from 'src/app/core/services/order.service';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public showOrderList: boolean;
  public showEmptyOrders: boolean;

  public orders: any;

  constructor(
    private menuService: MenuService,
    private personService: PersonService,
    private orderService: OrderService
  ) {
    this.menuService.getCartItems();
    this.getOrderList();
  }

  ngOnInit() {
    this.menuService.changeMenu(Menu.order);
  }

  async getOrderList() {
    const person = this.personService.getPersonalInformation();
    this.orders = await this.orderService.getOrders(person.document);
    if (this.orders === null || this.orders.length === 0) {
      this.showEmptyOrders = true;
    } else {
      this.showOrderList = true;
    }
  }
}

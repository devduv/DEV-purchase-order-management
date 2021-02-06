import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/core/model/Menu';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-empty-orders',
  templateUrl: './empty-orders.component.html',
  styleUrls: ['./empty-orders.component.scss']
})
export class EmptyOrdersComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
  }


  public goProduct() {
    this.menuService.changeMenu(Menu.product);
  }
}

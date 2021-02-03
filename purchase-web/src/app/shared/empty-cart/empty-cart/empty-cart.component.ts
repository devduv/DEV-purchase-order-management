import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/core/model/Menu';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.scss']
})
export class EmptyCartComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
  }

  public goProduct() {
    this.menuService.changeMenu(Menu.product);
  }
}

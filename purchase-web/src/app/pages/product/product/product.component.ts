import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Menu } from 'src/app/core/model/Menu';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public abstractList: any[];
  constructor(
    private menuService: MenuService
  ) {

  }

  ngOnInit() {
    this.menuService.changeMenu(Menu.product);
    this.menuService.getCartItems();
  }
}

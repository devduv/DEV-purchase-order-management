import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/core/model/Menu';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  subscription: Subscription;
  Menu = Menu;
  menu: number;
  constructor(
    public menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.subscription = this.menuService.subscribe((menu) => {
      this.menu = menu;
    });
  }

  changeMenu(menu: Menu) {
    this.menuService.changeMenu(menu);
  }

}

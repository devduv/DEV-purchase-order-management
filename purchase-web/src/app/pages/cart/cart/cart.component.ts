import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/core/model/Menu';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  public showShoppingCart: boolean;
  public showEmptyCart: boolean;

  public cart: any;
  public totalAmount: number = 0;

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.changeMenu(Menu.cart);
    this.menuService.getCartItems();
    this.getCart();
    this.calculatAmount();

  }

  private getCart() {
    this.cart = JSON.parse(localStorage.getItem('shopping-cart'));
    if (this.cart === null || this.cart.length === 0) {
      this.showEmptyCart = true;
    } else {
      this.showShoppingCart = true;
    }
  }

  public removeItem($event) {
    this.cart = this.cart.filter(u => u.product.id !== $event.product.id);
    this.menuService.setCartItems(this.cart);
    if (this.cart.length === 0) {
      this.showShoppingCart = false;
      this.showEmptyCart = true;
    }
    this.calculatAmount();
  }

  public calculatAmount() {
    this.totalAmount = 0;
    this.cart.forEach(item => {
      this.totalAmount = this.totalAmount + item.product.price * item.quantity;
    });
  }

  public actionQuantityItem($event) {
    this.calculatAmount();
  }
}

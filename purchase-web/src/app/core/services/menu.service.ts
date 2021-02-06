import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../model/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menu = new BehaviorSubject<number>(-1);
  public cartItems: number;

  constructor(private router: Router) { }

  public changeMenu(menu: Menu) {
    this.menu.next(menu);
    if (menu === Menu.product) {
      this.router.navigateByUrl('product');
    } else if (menu === Menu.cart) {
      this.router.navigateByUrl('cart');
    } else if (menu === Menu.order) {
      this.router.navigateByUrl('orders');
    }
  }

  subscribe(work: any) {
    return this.menu.subscribe(work);
  }

  public setCartItems(cart: any) {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
    this.cartItems = cart.length;
  }

  public getCartItems() {
    const cart = JSON.parse(localStorage.getItem('shopping-cart'));
    console.log(cart);
    this.cartItems = cart?.length;
  }
  
}

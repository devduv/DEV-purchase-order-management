import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuantityInput } from 'src/app/core/model/QuantityInput';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Input()
  public cart: any;

  @Output()
  public itemSeletected: EventEmitter<any> = new EventEmitter();

  public QuantityInput = new QuantityInput();

  @Output()
  public actionQuantityItem: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public removeItem(item: any) {
    this.itemSeletected.emit(item);
  }

  public actionQuantity($event, flag, product) {
    if ($event.value == 1 && flag == 0) {

    } else {
      this.QuantityInput.actionQuantity($event, flag, product);
      this.actionQuantityItem.emit(flag);
    }
  }

  public keyPress($event, quantity_media, item) {
    this.QuantityInput.keyPress($event, quantity_media, item);
    this.actionQuantityItem.emit(false);
  }
}

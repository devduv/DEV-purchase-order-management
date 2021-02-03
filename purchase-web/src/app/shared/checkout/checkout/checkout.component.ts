import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Menu } from 'src/app/core/model/Menu';
import { QuantityInput } from 'src/app/core/model/QuantityInput';
import { MenuService } from 'src/app/core/services/menu.service';
import { DialogCheckoutComponent } from '../../dialog/dialog-checkout/dialog-checkout.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  @Input()
  public cart: any;

  public QuantityInput = new QuantityInput();

  @Input()
  public totalAmount: number;

  constructor(
    private menuService: MenuService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public goProduct() {
    this.menuService.changeMenu(Menu.product);
  }

  public finishPurchase() {
    const dialogRef = this.dialog.open(DialogCheckoutComponent,
      {
        width: '500px',
        autoFocus: false,
        data: this.cart
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

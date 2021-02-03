import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ShoppingCartComponent]
})
export class ShoppingCartModule { }

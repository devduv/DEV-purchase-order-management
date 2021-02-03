import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';



@NgModule({
  declarations: [EmptyCartComponent],
  imports: [CommonModule],
  exports: [EmptyCartComponent]
})
export class EmptyCartModule { }

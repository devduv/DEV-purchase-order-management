import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyOrdersComponent } from './empty-orders/empty-orders.component';



@NgModule({
  declarations: [EmptyOrdersComponent],
  imports: [CommonModule],
  exports: [EmptyOrdersComponent]
})
export class EmptyOrdersModule { }

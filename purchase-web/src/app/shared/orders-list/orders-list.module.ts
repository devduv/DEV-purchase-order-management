import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatIconModule
  ],
  exports: [OrderListComponent]
})
export class OrdersListModule { }

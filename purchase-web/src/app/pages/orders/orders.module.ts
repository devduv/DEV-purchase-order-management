import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListModule } from 'src/app/shared/orders-list/orders-list.module';
import { EmptyOrdersModule } from 'src/app/shared/empty-orders/empty-orders.module';



@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    OrdersListModule,
    EmptyOrdersModule
  ]
})
export class OrdersModule { }

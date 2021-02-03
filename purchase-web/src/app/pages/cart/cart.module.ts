import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { ShoppingCartModule } from 'src/app/shared/shopping-cart/shopping-cart.module';
import { EmptyCartModule } from 'src/app/shared/empty-cart/empty-cart.module';
import { CheckoutModule } from 'src/app/shared/checkout/checkout.module';



@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    ShoppingCartModule,
    EmptyCartModule,
    CheckoutModule
  ],
  providers: [DatePipe],
})
export class CartModule { }

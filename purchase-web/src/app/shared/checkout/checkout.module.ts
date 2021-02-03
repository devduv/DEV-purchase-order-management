import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '../dialog/dialog.module';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    DialogModule
  ],
  exports: [CheckoutComponent]
})
export class CheckoutModule { }

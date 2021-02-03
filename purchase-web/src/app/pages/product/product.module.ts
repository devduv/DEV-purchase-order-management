import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListModule } from 'src/app/shared/product-list/product-list.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductListModule,
    
  ]
})
export class ProductModule { }

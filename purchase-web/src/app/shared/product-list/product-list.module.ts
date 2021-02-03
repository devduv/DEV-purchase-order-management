import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    LoadingModule
  ],
  exports: [ProductListComponent]
})
export class ProductListModule { }

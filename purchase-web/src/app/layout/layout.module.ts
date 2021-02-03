import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ToolbarComponent]
})
export class LayoutModule { }

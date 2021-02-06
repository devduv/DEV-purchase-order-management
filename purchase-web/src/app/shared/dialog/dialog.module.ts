import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCheckoutComponent } from './dialog-checkout/dialog-checkout.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingModule } from '../loading/loading.module';


@NgModule({
  declarations: [DialogCheckoutComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    LoadingModule
  ],
  exports: [DialogCheckoutComponent]
})
export class DialogModule { }

import { MiscellaneousReceiptRouterModule } from './miscellaneous-receipt-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatComponentsModule } from './../../../mat-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousReceiptComponent } from './view/miscellaneous-receipt.component';

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MiscellaneousReceiptRouterModule
  ],
  declarations: [MiscellaneousReceiptComponent]
})
export class MiscellaneousReceiptModule { }

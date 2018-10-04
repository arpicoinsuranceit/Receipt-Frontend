import { ReceiptRePrintRouterModule } from './receipt-re-print-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptRePrintComponent } from './view/receipt-re-print.component';
import { MatComponentsModule } from '../../../mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReceiptRePrintRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ReceiptRePrintComponent],
  providers : []
})
export class ReceiptRePrintModule { }

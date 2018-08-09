import { AlertComponent } from './../../core/alert/alert.component';
import { QuotationReceiptService } from './../../../service/quotation-receipt-service/quotation-receipt.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from './../../../mat-components.module';
import { QuotationReceiptComponent } from './view/quotation-receipt.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationReceiptRouterModule } from './quotation-receipt-router.module';
import { MatCommonModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    QuotationReceiptRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [QuotationReceiptComponent],
  providers: [QuotationReceiptService]
})
export class QuotationReceiptModule { }

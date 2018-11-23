import { CommonService } from './../../../service/common-service/common.service';
import { BlobService } from './../../../service/blob-service/blob.service';
import { LoanReceiptComponent } from './view/loan-receipt.component';
import { LoanReceiptRouterModule } from './loan-receipt-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatComponentsModule } from './../../../mat-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LoanReceiptRouterModule
  ],
  declarations: [LoanReceiptComponent],
  providers : [BlobService]
})
export class LoanReceiptModule { }

import { LoanReceiptService } from './../../../service/loan-receipt/loan-receipt.service';
import { BlobService } from './../../../service/blob-service/blob.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanReceiptComponent } from './view/loan-receipt.component';
import { MatComponentsModule } from 'app/mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoanReceiptRouterModule } from './loan-receipt-router.module';
import { PolicyReceiptService } from 'app/service/policy-receipt-service/policy-receipt.service';
import { CommonService } from 'app/service/common-service/common.service';

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule,
    LoanReceiptRouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [LoanReceiptComponent],
  providers: [PolicyReceiptService,BlobService,CommonService,LoanReceiptService]
})
export class LoanReceiptModule { }

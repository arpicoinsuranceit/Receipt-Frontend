import { BlobService } from './../../../service/blob-service/blob.service';
import { ProposalReceiptComponent } from './view/proposal-receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../../mat-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProposalReceiptRouterModule } from './proposal-receipt-router.module';
import { ProposalReceiptService } from '../../../service/proposal-receipt-service/proposal-receipt.service';

@NgModule({
  imports: [
    CommonModule,
    ProposalReceiptRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProposalReceiptComponent],
  providers : [ProposalReceiptService, BlobService]
})
export class ProposalReceiptModule { }

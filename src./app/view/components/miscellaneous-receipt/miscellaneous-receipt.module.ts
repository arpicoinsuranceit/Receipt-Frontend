import { BlobService } from './../../../service/blob-service/blob.service';
import { MiscellaneousReceiptRouterModule } from './miscellaneous-receipt-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatComponentsModule } from '../../../mat-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousReceiptComponent } from './view/miscellaneous-receipt.component';
import { MiscellaneousReceiptInvService } from '../../../service/miscellaneous-receipy-inv/miscellaneous-receipt-inv.service';

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MiscellaneousReceiptRouterModule
  ],
  declarations: [MiscellaneousReceiptComponent],
  providers : [MiscellaneousReceiptInvService, BlobService]
})
export class MiscellaneousReceiptModule { }

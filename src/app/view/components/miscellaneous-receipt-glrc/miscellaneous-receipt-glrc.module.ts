import { MiscellaneousReceiptGlrcRouterModule } from './miscellaneous-receipt-glrc-router.module';
import { MiscellaneousReceiptGlrcComponent } from './view/miscellaneous-receipt-glrc/miscellaneous-receipt-glrc.component';
import { BlobService } from '../../../service/blob-service/blob.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatComponentsModule } from '../../../mat-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousReceiptInvService } from '../../../service/miscellaneous-receipy-inv/miscellaneous-receipt-inv.service';

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MiscellaneousReceiptGlrcRouterModule
  ],
  declarations: [MiscellaneousReceiptGlrcComponent],
  providers : [MiscellaneousReceiptInvService, BlobService]
})
export class MiscellaneousReceiptGlrcModule { }

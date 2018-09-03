import { ReceiptCancelationRouterModule } from './receipt-cancelation-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceiptCancelationComponent } from './view/receipt-cancelation.component';
import { PolicyReceiptService } from '../../../service/policy-receipt-service/policy-receipt.service';
import { ReceiptCancelationService } from '../../../service/receipt-cancelation-service/receipt-cancelation.service';

@NgModule({
  imports: [
    CommonModule,
    ReceiptCancelationRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ReceiptCancelationComponent],
  providers : [ReceiptCancelationService]
})
export class ReceiptCancelationModule { }

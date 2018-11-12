import { ReceiptInquiryService } from './../../../service/receipt-inquiry/receipt-inquiry.service';
import { ReceiptInquiryComponent } from './view/receipt-inquiry.component';
import { ReceiptInquiryRouterModule } from './receipt-inquiry-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../mat-components.module';
import { FlexLayoutModule } from '../../../../../node_modules/@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '../../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReceiptInquiryRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ReceiptInquiryComponent],
  providers : [ReceiptInquiryService]

})
export class ReceiptInquiryModule { }

import { PolicyReceiptService } from '../../../service/policy-receipt-service/policy-receipt.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatComponentsModule } from '../../../mat-components.module';
import { MatCommonModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyReceiptComponent } from './view/policy-receipt.component';
import { PolicyReceiptRouterModule } from './policy-receipt-router.module';

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule,
    PolicyReceiptRouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PolicyReceiptComponent],
  providers : [PolicyReceiptService]
})
export class PolicyReceiptModule { }

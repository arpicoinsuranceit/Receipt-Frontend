import { ProposalReceiptComponent } from './view/proposal-receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from './../../../mat-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProposalReceiptRouterModule } from './proposal-receipt-router.module';

@NgModule({
  imports: [
    CommonModule,
    ProposalReceiptRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProposalReceiptComponent]
})
export class ProposalReceiptModule { }

import { QuotationReceiptService } from './../../../service/quotation-receipt-service/quotation-receipt.service';
import { BranchUnderwriteService } from './../../../service/branch-underwrite/branch-underwrite.service';
import { BranchUnderwriteComponent } from './view/branch-underwrite.component';
import { BranchUnderwriteRouterModule } from './branch-underwrite-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UppercaseDirective } from '../../../direvtives/uppercase.directive';

@NgModule({
  imports: [
    CommonModule,
    BranchUnderwriteRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [BranchUnderwriteComponent,UppercaseDirective],
  providers : [BranchUnderwriteService,QuotationReceiptService]

})
export class BranchUnderwriteModule { }

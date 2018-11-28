import { WorkFlowService } from './../../../service/work-flow-service/work-flow.service';
import { BranchUnderwriteService } from './../../../service/branch-underwrite/branch-underwrite.service';
import { ShortPremiumComponent } from './view/short-premium/short-premium.component';
import { ReceiptCancelationComponent } from './view/receipt-cancelation/receipt-cancelation.component';
import { PermanantLapsComponent } from './view/permanant-laps/permanant-laps.component';
import { CourierReceiveableComponent } from './view/courier-receiveable/courier-receiveable.component';
import { CodeTransferComponent } from './view/code-transfer/code-transfer.component';
import { ActiveComponent } from './view/active/active.component';
import { WorkflowComponent } from './view/workflow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatComponentsModule } from './../../../mat-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowRouterModule } from './workflow-router.module';
import { UnderwriteComponent } from './view/underwrite/underwrite.component';
import { CourierPendingComponent } from './view/courier-pending/courier-pending.component';
import { PendingReqComponent } from './view/pending-req/pending-req.component';
import { PromisesComponent } from './view/promises/promises.component';
import { TempLapsComponent } from './view/temp-laps/temp-laps.component';
import { SettlementPopupComponent } from './view/settlement-popup/settlement-popup.component';

@NgModule({
  imports: [
    CommonModule,
    WorkflowRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    WorkflowComponent,
    SettlementPopupComponent,
    ActiveComponent,
    CodeTransferComponent,
    CourierPendingComponent,
    CourierReceiveableComponent, 
    PendingReqComponent,
    PermanantLapsComponent,
    PromisesComponent,
    ReceiptCancelationComponent,
    ShortPremiumComponent,
    TempLapsComponent,
    UnderwriteComponent
  ],
  providers: [BranchUnderwriteService, WorkFlowService],
  entryComponents:[SettlementPopupComponent]
})
export class WorkflowModule { }

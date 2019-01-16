import { MiscellaneousReceiptModule } from './../../components/miscellaneous-receipt/miscellaneous-receipt.module';
import { PolicyReceiptModule } from './../../components/policy-receipt/policy-receipt.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './view/home-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren : "app/view/components/home/home.module#HomeModule"
      },
      {
        path: 'quoreceipt',
        loadChildren : "app/view/components/quotation-receipt/quotation-receipt.module#QuotationReceiptModule"
      },
      {
        path: 'proposalreceipt',
        loadChildren : "app/view/components/proposal-receipt/proposal-receipt.module#ProposalReceiptModule"
      },
      {
        path: 'proposalreceipt/:propNo/:seqNo/:amt',
        loadChildren : "app/view/components/proposal-receipt/proposal-receipt.module#ProposalReceiptModule"
      },
      {
        path: 'underwrite',
        loadChildren : "app/view/components/branch-underwrite/branch-underwrite.module#BranchUnderwriteModule"
      },
      {
        path: 'underwrite/:propNo/:seqNo/:brnCode/:agentCode',
        loadChildren : "app/view/components/branch-underwrite/branch-underwrite.module#BranchUnderwriteModule"
      },
      {
        path: 'policyreceipt',
        loadChildren : "app/view/components/policy-receipt/policy-receipt.module#PolicyReceiptModule"
      },
      {
        path: 'loanreceipt',
        loadChildren : "app/view/components/loan-receipt/loan-receipt.module#LoanReceiptModule"
      },
      {
        path: 'miscellaneousreceipt',
        loadChildren : "app/view/components/miscellaneous-receipt/miscellaneous-receipt.module#MiscellaneousReceiptModule"
      },
      {
        path: 'miscellaneousreceiptgl',
        loadChildren : "app/view/components/miscellaneous-receipt-glrc/miscellaneous-receipt-glrc.module#MiscellaneousReceiptGlrcModule"
      },
      {
        path: 'receiptinquiry',
        loadChildren : "app/view/components/receipt-inquiry/receipt-inquiry.module#ReceiptInquiryModule"
      },
      {
        path: 'agentinquiry',
        loadChildren : "app/view/components/agent-inquiry/agent-inquiry.module#AgentInquiryModule"
      },
      {
        path: 'receiptcancelation',
        loadChildren : "app/view/components/receipt-cancelation/receipt-cancelation.module#ReceiptCancelationModule"
      },
      {
        path: 'receiptreprint',
        loadChildren : "app/view/components/receipt-re-print/receipt-re-print.module#ReceiptRePrintModule"
      },
      {
        path: 'courierdocument',
        loadChildren : "app/view/components/courier-document/courier-document.module#CourierDocumentModule"
      },
      {
        path: 'workflow',
        loadChildren : "app/view/components/workflow/workflow.module#WorkflowModule"
      },
      {
        path: 'codetransfer',
        loadChildren : "app/view/components/code-transfer/code-transfer.module#CodeTransferModule"
      },
      {
        path: 'report',
        loadChildren : "app/view/components/report/report.module#ReportModule"
      },
      {
        path: 'changepassword',
        loadChildren : "app/view/components/change-password/change-password.module#ChangePasswordModule"
      }
    ]
  }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLayoutRouterModule { }

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
        loadChildren : "src/app/view/components/home/home.module#HomeModule"
      },
      {
        path: 'quoreceipt',
        loadChildren : "src/app/view/components/quotation-receipt/quotation-receipt.module#QuotationReceiptModule"
      },
      {
        path: 'proposalreceipt',
        loadChildren : "src/app/view/components/proposal-receipt/proposal-receipt.module#ProposalReceiptModule"
      },
      {
        path: 'underwrite',
        loadChildren : "src/app/view/components/branch-underwrite/branch-underwrite.module#BranchUnderwriteModule"
      },
      {
        path: 'policyreceipt',
        loadChildren : "src/app/view/components/policy-receipt/policy-receipt.module#PolicyReceiptModule"
      },
      {
        path: 'miscellaneousreceipt',
        loadChildren : "src/app/view/components/miscellaneous-receipt/miscellaneous-receipt.module#MiscellaneousReceiptModule"
      },
      {
        path: 'miscellaneousreceiptgl',
        loadChildren : "src/app/view/components/miscellaneous-receipt-glrc/miscellaneous-receipt-glrc.module#MiscellaneousReceiptGlrcModule"
      },
      {
        path: 'receiptinquiry',
        loadChildren : "src/app/view/components/receipt-inquiry/receipt-inquiry.module#ReceiptInquiryModule"
      },
      {
        path: 'receiptcancelation',
        loadChildren : "src/app/view/components/receipt-cancelation/receipt-cancelation.module#ReceiptCancelationModule"
      }
    ]
  }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLayoutRouterModule { }

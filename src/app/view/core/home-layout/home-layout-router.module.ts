import { ReceiptInquiryModule } from './../../components/receipt-inquiry/receipt-inquiry.module';
import { BranchUnderwriteModule } from '../../components/branch-underwrite/branch-underwrite.module';
//import { PolicyReceiptModule } from './../../components/policy-receipt/policy-receipt.module';
import { ProposalReceiptModule } from '../../components/proposal-receipt/proposal-receipt.module';
import { HomeModule } from '../../components/home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './view/home-layout.component';
import { QuotationReceiptModule } from '../../components/quotation-receipt/quotation-receipt.module';
import { PolicyReceiptModule } from '../../components/policy-receipt/policy-receipt.module';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren : ()=> HomeModule
      },
      {
        path: 'quoreceipt',
        loadChildren : ()=> QuotationReceiptModule
      },
      {
        path: 'proposalreceipt',
        loadChildren : ()=> ProposalReceiptModule
      } ,
      {
        path: 'policyreceipt',
        loadChildren : ()=> PolicyReceiptModule
      },
      {
        path: 'underwrite',
        loadChildren : ()=> BranchUnderwriteModule
      },
      {
        path: 'receiptinquiry',
        loadChildren : ()=> ReceiptInquiryModule
      },
      {
        path: '**',
        loadChildren : ()=> ProposalReceiptModule
      }

    ]
  }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLayoutRouterModule { }

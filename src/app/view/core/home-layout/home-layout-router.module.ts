import { ProposalReceiptModule } from './../../components/proposal-receipt/proposal-receipt.module';
import { HomeModule } from './../../components/home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './view/home-layout.component';
import { QuotationReceiptModule } from '../../components/quotation-receipt/quotation-receipt.module';

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
      }
    ]
  }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLayoutRouterModule { }

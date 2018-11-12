
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProposalReceiptComponent } from './view/proposal-receipt.component';

const routes: Routes = [
  {
    path: '',
    component: ProposalReceiptComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalReceiptRouterModule { }

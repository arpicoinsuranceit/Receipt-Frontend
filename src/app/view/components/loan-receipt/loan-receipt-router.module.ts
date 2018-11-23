import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoanReceiptComponent } from './view/loan-receipt.component';

const routes: Routes = [
  {
    path: '',
    component: LoanReceiptComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanReceiptRouterModule { }

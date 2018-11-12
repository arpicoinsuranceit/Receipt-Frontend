
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PolicyReceiptComponent } from './view/policy-receipt.component';

const routes: Routes = [
  {
    path: '',
    component: PolicyReceiptComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyReceiptRouterModule { }

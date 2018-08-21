
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MiscellaneousReceiptComponent } from './view/miscellaneous-receipt.component';

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousReceiptComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscellaneousReceiptRouterModule { }

import { MiscellaneousReceiptGlrcComponent } from './view/miscellaneous-receipt-glrc/miscellaneous-receipt-glrc.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousReceiptGlrcComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscellaneousReceiptGlrcRouterModule { }

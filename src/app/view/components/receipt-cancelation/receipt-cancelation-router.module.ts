import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptCancelationComponent } from './view/receipt-cancelation.component';

const routes: Routes = [
  {
    path: '',
    component: ReceiptCancelationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptCancelationRouterModule { }

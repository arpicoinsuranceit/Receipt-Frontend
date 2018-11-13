import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeTransferComponent } from './view/code-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: CodeTransferComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeTransferRouterModule { }

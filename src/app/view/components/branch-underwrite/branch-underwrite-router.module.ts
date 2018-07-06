import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BranchUnderwriteComponent } from './view/branch-underwrite.component';

const routes: Routes = [
  {
    path: '',
    component: BranchUnderwriteComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchUnderwriteRouterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AgentInquiryComponent } from './view/agent-inquiry.component';

const routes: Routes = [
  {
    path: '',
    component: AgentInquiryComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentInquiryRouterModule { }

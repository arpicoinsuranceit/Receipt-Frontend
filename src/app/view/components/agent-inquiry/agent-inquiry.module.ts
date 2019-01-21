import { AgentInquiryRouterModule } from './agent-inquiry-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from 'app/mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgentInquiryComponent } from './view/agent-inquiry.component';
import { AgentInquiryService } from 'app/service/agent-inquiry-service/agent-inquiry.service';

@NgModule({
  imports: [
    CommonModule,
    AgentInquiryRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AgentInquiryComponent],
  providers : [AgentInquiryService]
})
export class AgentInquiryModule { }

import { BlobService } from './../../../service/blob-service/blob.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatComponentsModule } from './../../../mat-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalInquiryComponent } from './view/proposal-inquiry.component';
import { PropsoalInquiryService } from '../../../service/propsoal-inquiry/propsoal-inquiry.service';
import { ProposalInquiryRouterModule } from './proposal-inquiry-router.module';
@NgModule({
  imports: [
    CommonModule,
    ProposalInquiryRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProposalInquiryComponent],
  providers: [BlobService, PropsoalInquiryService]
})
export class ProposalInquiryModule {
}

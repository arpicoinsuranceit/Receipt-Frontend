import { CourierDocumentComponent } from './view/courier-document.component';
import { CourierDocumentRouterModule } from './courier-document.router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourierDocumentService } from '../../../service/courier-document/courier-document.service';

@NgModule({
  imports: [
    CommonModule,
    CourierDocumentRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CourierDocumentComponent],
  providers : [CourierDocumentService]
})
export class CourierDocumentModule { }

import { CodeTransferRouterModule } from './code-transfer-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeTransferComponent } from './view/code-transfer.component';
import { MatComponentsModule } from 'app/mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UppercaseDirective } from 'app/direvtives/uppercase.directive';
import { CodeTransferService } from 'app/service/code-transfer/code-transfer.service';

@NgModule({
  imports: [
    CommonModule,
    CodeTransferRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CodeTransferComponent,UppercaseDirective],
  providers : [CodeTransferService]
})
export class CodeTransferModule { }

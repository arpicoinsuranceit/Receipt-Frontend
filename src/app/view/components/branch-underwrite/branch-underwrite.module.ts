import { BranchUnderwriteComponent } from './view/branch-underwrite.component';
import { BranchUnderwriteRouterModule } from './branch-underwrite-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BranchUnderwriteRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [BranchUnderwriteComponent],
  providers : []
})
export class BranchUnderwriteModule { }

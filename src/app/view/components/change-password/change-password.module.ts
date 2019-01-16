import { ChangePasswordRouterModule } from './change-password-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './view/change-password.component';
import { MatComponentsModule } from 'app/mat-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'app/service/auth-service/auth.service';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRouterModule,
    MatComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ChangePasswordComponent],
  providers : [AuthService]
})
export class ChangePasswordModule { }
